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
 * @param {string} sourceLang - The source language code (e.g., 'cs').
 * @param {string} targetLang - The target language code (e.g., 'en').
 * @param {deepl.TargetLanguage} deeplTargetLang - The specific target language for DeepL API (e.g., 'en-US').
 */
async function translateDirection(sourceLang, targetLang, deeplTargetLang) {
  console.log(`\n--- Starting translation from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()} ---`);
  
  const files = await glob(`src/content/docs/${sourceLang}/**/*.md`);

  for (const file of files) {
    const targetPath = file.replace(`/${sourceLang}/`, `/${targetLang}/`);

    // Skip if target file already exists to prevent loops and re-translation
    if (await fs.pathExists(targetPath)) {
      continue;
    }

    const rawContent = await fs.readFile(file, "utf8");
    const { content, data } = matter(rawContent);

    // Skip empty files
    if (!content.trim()) {
      console.log(`Skipping empty file: ${file}`);
      continue;
    }

    console.log(`Translating: ${file}...`);

    try {
      const result = await translator.translateText(
        content,
        sourceLang,
        deeplTargetLang,
        {
          preserveFormatting: true,
          tagHandling: "xml",
          ignoreTags: ["code", "pre"],
        }
      );

      await fs.ensureDir(path.dirname(targetPath));
      await fs.writeFile(
        targetPath,
        matter.stringify(result.text, data)
      );

      console.log(`✔ Success: ${targetPath}`);
    } catch (err) {
      console.error(`✖ Error for ${file}:`, err);
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