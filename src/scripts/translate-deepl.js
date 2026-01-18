import fs from "fs-extra";
import { glob } from "glob";
import matter from "gray-matter";
import * as deepl from "deepl-node";
import path from "path";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

async function translate() {
  // Opravený glob pro moderní Node.js
  const files = await glob("src/content/docs/cs/**/*.md");

  for (const file of files) {
    const target = file.replace("/cs/", "/en/");

    // Přeskočit, pokud už existuje
    if (await fs.pathExists(target)) continue;

    // Čtení souboru
    const raw = await fs.readFile(file, "utf8");
    const { content, data } = matter(raw);

    // Pokud je soubor prázdný, přeskočit
    if (!content.trim()) continue;

    console.log(`Překládám: ${file}...`);

    try {
      const result = await translator.translateText(
        content,
        "cs",
        "en-US",
        { 
          preserveFormatting: true,
          tagHandling: "xml", // KLÍČOVÉ: Ochrání Markdown značky
          ignoreTags: ["code", "pre"] // Volitelné: nešahat na kód
        }
      );

      await fs.ensureDir(path.dirname(target));
      await fs.writeFile(
        target,
        matter.stringify(result.text, data)
      );

      console.log(`✔ Hotovo: ${target}`);
    } catch (err) {
      console.error(`✖ Chyba u ${file}:`, err);
    }
  }
}

translate();