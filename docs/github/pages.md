# GitHub Pages
[j-ochmann.github.io](https://j-ochmann.github.io/)
- používá Jekyll a GitHub Actions.
- **docs/index.md** se převede z Markdown na HTML a obalí výchozím Jekyll theme.
## Jak změnit theme (nejrychlejší způsob)
V kořeni repa (nebo v /docs) vytvoř nebo uprav soubor:
**📄 _config.yml**
```yaml
title: Jindřich Ochmann
description: Vývoj, jazyky, projekty
theme: jekyll-theme-hacker
```
Commit → push → hotovo.

Pár použitelných theme: `jekyll-theme-minimal/hacker/cayman/midnight/slate/dinky`

[👉 Kompletní seznam](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?versionId=free-pro-team%40latest&productId=pages&restPage=getting-started-with-github-pages%2Cconfiguring-a-publishing-source-for-your-github-pages-site#supported-themes)

## Jak OVLIVNIT OBSAH (strukturu)

Doporučená struktura:

docs/
├── _config.yml
├── index.md
├── about.md
├── projects.md
├── assets/
│   └── img/
└── _layouts/

index.md
---
layout: default
title: Úvod
---

# Ahoj 👋
Jmenuji se **Jindřich Ochmann**

- programování
- jazyky
- experimenty


⚠️ Ten YAML blok (---) je důležitý

4️⃣ Navigace (menu nahoře)

V _config.yml:

title: Jindřich Ochmann
theme: jekyll-theme-cayman

nav:
  - title: Home
    url: /
  - title: Projekty
    url: /projects
  - title: O mně
    url: /about


A odpovídající soubory:

projects.md
about.md

5️⃣ Vlastní CSS (tady začíná „mám kontrolu“)
1️⃣ Vytvoř soubor:
docs/assets/css/style.scss

2️⃣ Obsah:
---
---

@import "{{ site.theme }}";

body {
  font-family: system-ui, sans-serif;
}

h1 {
  color: #ff6600;
}


GitHub Pages:

pozná SCSS

přeloží ho

přepíše default styl theme

6️⃣ Když chceš ÚPLNOU kontrolu (doporučeno pro tebe)

Přestaň používat „remote theme“ a:

1️⃣ Vytvoř layout:
docs/_layouts/default.html

<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>{{ page.title }} | {{ site.title }}</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

<header>
  <h1>{{ site.title }}</h1>
</header>

<main>
  {{ content }}
</main>

</body>
</html>

2️⃣ V _config.yml smaž theme:

Od té chvíle:

žádné Jekyll kouzla

čistý statický web

Markdown → HTML → tvůj layout

7️⃣ Doporučení pro tebe (upřímně)

Z toho, co dlouhodobě řešíš:

programovací jazyky

generování obsahu

strukturovaná data

👉 GitHub Pages + Jekyll je pro tebe ideální MVP

Ale:

jakmile začneš chtít interaktivitu → Vite / Astro / Next

Pages pak jen jako hosting

8️⃣ Chceš pokračovat?

Můžeme jít kteroukoli cestou:

1️⃣ Navrhnu ti konkrétní strukturu webu (jazyky, projekty, blog)
2️⃣ Uděláme vlastní minimalistický theme bez Jekyll magie
3️⃣ Přepneme to na Astro + GitHub Pages
4️⃣ Nebo z toho uděláme učebnici jazyků, kterou generuješ ze strukturovaných dat

Stačí říct čím chceš, aby ten web byl – a půjdeme rovnou na hotové řešení, ne teorii.
