import fs from "fs-extra";
import { glob } from "glob";
import matter from "gray-matter";
import * as deepl from "deepl-node";
import path from "path";

// Initialize the translator
const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

/**
 * Translates markdown files from a source language to a target language.
 * Skips translation if the target file already exists.
 * Implements chunking for large files.
 * @param {string} sourceLang - The source language code (e.g., 'cs').
 * @param {string} targetLang - The target language code (e.g., 'en').
 * @param {deepl.TargetLanguage} deeplTargetLang - The specific target language for DeepL API (e.g., 'en-US').
 */
async function translateDirection(sourceLang, targetLang, deeplTargetLang) {
  console.log(`\n--- Starting translation from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()} ---`);
  
  const files = await glob(`src/content/docs/${sourceLang}/**/*.md`);

  for (const file of files) {
    const targetPath = file.replace(`/${sourceLang}/`, `/${targetLang}/`);

    if (await fs.pathExists(targetPath)) {
      continue;
    }

    const rawContent = await fs.readFile(file, "utf8");
    let { content, data } = matter(rawContent);

    if (!content.trim()) {
      console.log(`Skipping empty file: ${file}`);
      continue;
    }

    console.log(`Translating: ${file}...`);

    let translatedContent = "";

    try {
      // --- Pre-process to protect code blocks ---
      const codeBlocks = [];
      let i = 0;
      content = content.replace(/```[\s\S]*?```/g, (match) => {
        const placeholder = `<code-block id="${i++}"></code-block>`;
        codeBlocks.push(match);
        return placeholder;
      });
      // --- End of pre-processing ---

      const translationOptions = {
        preserveFormatting: true,
        tagHandling: "xml",
        ignoreTags: ["code-block"],
      };

      try {
        // 1. Attempt to translate the whole content at once
        const result = await translator.translateText(
          content,
          sourceLang,
          deeplTargetLang,
          translationOptions
        );
        translatedContent = result.text;

      } catch (error) {
        // 2. If it fails, check if it's a size limit error
        if (error instanceof deepl.DeepLError && error.message.includes("Request size exceeds limit")) {
          console.log(`  -> File is too large, translating in chunks...`);
          
          // 3. Split content into paragraphs and translate chunk by chunk
          const chunks = content.split('\n\n');
          const translatedChunks = [];

          for (const chunk of chunks) {
            if (!chunk.trim()) {
              translatedChunks.push("");
              continue;
            }
            const chunkResult = await translator.translateText(
              chunk,
              sourceLang,
              deeplTargetLang,
              translationOptions
            );
            translatedChunks.push(chunkResult.text);
          }
          
          translatedContent = translatedChunks.join('\n\n');
          console.log(`  -> Chunk translation finished.`);

        } else {
          // 4. If it's another type of error, re-throw to be caught by the outer catch
          throw error;
        }
      }

      // --- Post-process to restore code blocks ---
      if (translatedContent) {
          translatedContent = translatedContent.replace(/<code-block id="(\d+)"><\/code-block>/g, (match, id) => {
            return codeBlocks[parseInt(id, 10)];
          });
      }
      // --- End of post-processing ---

      await fs.ensureDir(path.dirname(targetPath));
      await fs.writeFile(
        targetPath,
        matter.stringify(translatedContent, data)
      );

      console.log(`✔ Success: ${targetPath}`);
    } catch (err) {
      console.error(`✖ Error for ${file}:`, err.message);
    }
  }
}

/**
 * Main function to run all translation directions.
 */
async function main() {
  if (!process.env.DEEPL_API_KEY) {
    console.error("DEEPL_API_KEY environment variable is not set.");
    return;
  }
  
  // Translate from Czech to English
  await translateDirection("cs", "en", "en-US");

  // Translate from English to Czech
  await translateDirection("en", "cs", "cs");

  console.log("\n--- Translation process finished. ---");
}

main();