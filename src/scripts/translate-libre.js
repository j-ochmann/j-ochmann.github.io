import fs from "fs-extra";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

const LT_URL = process.env.LT_URL;
const API_KEY = process.env.LT_API_KEY;

async function translate() {
  const files = await glob("src/content/docs/cs/**/*.md");

  for (const file of files) {
    const target = file.replace("/cs/", "/en/");
    if (await fs.pathExists(target)) continue;

    console.log(`Překládám přes LibreTranslate: ${file}`);
    const raw = await fs.readFile(file, "utf8");
    const { content, data } = matter(raw);

    if (!content.trim()) continue;

    try {
      const response = await fetch(`${LT_URL}/translate`, {
        method: "POST",
        body: JSON.stringify({
          q: content,
          source: "cs",
          target: "en",
          format: "markdown", // Tady LibreTranslate exceluje
          api_key: API_KEY
        }),
        headers: { "Content-Type": "application/json" }
      });

      const result = await response.json();

      if (result.translatedText) {
        await fs.ensureDir(path.dirname(target));
        await fs.writeFile(target, matter.stringify(result.translatedText, data));
        console.log(`✔ Uloženo: ${target}`);
      } else {
        console.error(`✖ Chyba u ${file}:`, result.error || "Neznámá chyba");
      }
    } catch (err) {
      console.error(`✖ Server neodpovídá: ${err.message}`);
    }
  }
}

translate();
