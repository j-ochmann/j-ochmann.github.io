import fs from "fs-extra";
import { glob } from "glob";
import matter from "gray-matter";
import crypto from "crypto";
import path from "path";
/* Plně automatizovaný lokalizační systém
 * - detekuje změny (Do frontmatter ukládá source_hash.)
 * - multisměrovost (Z libovolného jazyka do ostatních.)
 * - brání opakovaným překladům.
 * - ochrana proti smyčce:
 *    Díky značce translation_status: "translated" skript 
 *    nikdy nepoužije překlad jako zdroj pro další překlad.
 *    Zamezuje degradaci textu (tzv. "tichá pošta"). */

const LINGVA_URL = process.env.LINGVA_URL || "http://SERVER_IP:3000";
const CONTENT_PATH = "src/content/docs";
const LANGUAGES = ["cs", "en", "de", "es"];

// Funkce pro výpočet hashe obsahu (bez frontmatteru)
const calculateHash = (content) => {
  return crypto.createHash("md5").update(content).digest("hex");
};

async function translateText(text, from, to) {
  try {
    const res = await fetch(`${LINGVA_URL}/api/v1/${from}/${to}/${encodeURIComponent(text)}`);
    const data = await res.json();
    return data.translation;
  } catch (e) {
    console.error(`Chyba překladu z ${from} do ${to}:`, e);
    return null;
  }
}

async function run() {
  // Procházíme všechny podporované jazyky jako zdroje
  for (const sourceLang of LANGUAGES) {
    const files = await glob(`${CONTENT_PATH}/${sourceLang}/**/*.{md,mdx}`);

    for (const filePath of files) {
      const raw = await fs.readFile(filePath, "utf8");
      const { content, data: frontmatter } = matter(raw);
      const currentHash = calculateHash(content);

      // Pokud je soubor už překlad, nebudeme ho brát jako zdroj pro další překlady
      if (frontmatter.translation_status === "translated") continue;

      // Označíme originál
      if (frontmatter.content_hash !== currentHash) {
        frontmatter.content_hash = currentHash;
        frontmatter.translation_status = "original";
        await fs.writeFile(filePath, matter.stringify(content, frontmatter));
      }

      // Překlad do ostatních jazyků
      for (const targetLang of LANGUAGES) {
        if (sourceLang === targetLang) continue;

        const targetPath = filePath.replace(`/${sourceLang}/`, `/${targetLang}/`);
        
        // Kontrola, zda je potřeba překládat
        if (await fs.pathExists(targetPath)) {
          const targetRaw = await fs.readFile(targetPath, "utf8");
          const { data: targetFrontmatter } = matter(targetRaw);
          if (targetFrontmatter.source_hash === currentHash) {
            console.log(`- ${targetLang} je aktuální pro ${filePath}`);
            continue;
          }
        }

        console.log(`-> Překládám ${filePath} do ${targetLang}...`);
        const translatedContent = await translateText(content, sourceLang, targetLang);

        if (translatedContent) {
          const newFrontmatter = {
            ...frontmatter,
            title: await translateText(frontmatter.title || "", sourceLang, targetLang),
            translation_status: "translated",
            source_hash: currentHash,
            translated_from: sourceLang
          };

          await fs.ensureDir(path.dirname(targetPath));
          await fs.writeFile(targetPath, matter.stringify(translatedContent, newFrontmatter));
          console.log(`✔ Hotovo: ${targetPath}`);
        }
      }
    }
  }
}

run();
