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

👉 [Kompletní seznam](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?versionId=free-pro-team%40latest&productId=pages&restPage=getting-started-with-github-pages%2Cconfiguring-a-publishing-source-for-your-github-pages-site#supported-themes)

## Jak OVLIVNIT OBSAH (strukturu)

Doporučená struktura:
```text
docs/
├── _config.yml
├── index.md
├── about.md
├── projects.md
├── assets/
│   └── img/
└── _layouts/
```
`index.md`
```md
---
layout: default
title: Úvod
---

# Ahoj 👋
Jmenuji se **Jindřich Ochmann**

- programování
- jazyky
- experimenty
```
>⚠️ Ten YAML blok (---) je důležitý

## Navigace (menu nahoře)

V `_config.yml`:
```yaml
title: Jindřich Ochmann
theme: jekyll-theme-cayman

nav:
  - title: Home
    url: /
  - title: Projekty
    url: /projects
  - title: O mně
    url: /about
```
A odpovídající soubory:
```text
projects.md
about.md
```
## Vlastní CSS (tady začíná „kontrola“)
1. Vytvoř soubor: `docs/assets/css/style.scss`
2. Obsah:
```scss
---
---

@import "{{ site.theme }}";

body {
  font-family: system-ui, sans-serif;
}

h1 {
  color: #ff6600;
}
```
GitHub Pages:
- pozná SCSS
- přeloží ho
- přepíše default styl theme

## Když chcete ÚPLNOU kontrolu
- nepoužívat „remote theme“
1. vytvořte layout:
```html
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
```
2. V _config.yml smažte theme:

Žádná Jekyll kouzla, ale čistý statický web.

Markdown → HTML → Váš layout
