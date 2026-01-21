---
layout: default
title: GitHub Pages
content_hash: 9f2fa426eb61090916fd65fa993d492f
translation_status: original
---
# GitHub Web Pages
1. Create a repository
    - repository name: username.github.io
    - must be set as public
    - check Add a README file
2. Upload website content
    - index.html (main website page)
    - commit changes to save them.
3. Activate GitHub Pages
    - Settings tab in the top menu of the repository
    - "Pages" in the left panel in the "Code and automation" section
    - in "Build and deployment" under Source, select Deploy from a branch
    - in the drop-down list under Branch, select the main (or master) branch and the / (root) folder
    - click the Save button.
4. Publish the website
    - After saving, a bar will appear at the top of the "Pages" section with information about the ongoing deployment.
    - Within a few minutes (usually up to 10), a confirmation will appear,
      that the website is online, along with its address: username.github.io.
## Important limitations:
GitHub Pages only supports static websites (HTML, CSS, JavaScript, frameworks like React or Angular).
It does not support server-side languages like PHP, Python (Django/Flask) or databases.

## You can create GitHub Pages using Markdown (.md).
   GitHub has an integrated Jekyll generator,
   which automatically converts these files into web pages.

## Here are the main ways to do it:
1. Quick method via theme selection (easiest)
This method does not require any coding, you only need one .md file:
Create a README.md or index.md file in the repository.
Go to Settings -> Pages.
In the "Build and deployment" section, click the Choose a theme button (if not displayed, make sure you have Deploy from a branch set as the source).
Select a theme and confirm. GitHub automatically creates a _config.yml file, which links Markdown to the selected template.
2. Custom structure with Jekyll
If you want more control over the website, you can organize Markdown files yourself:
index.md: Becomes the main page (index.html).
kontakt.md: Automatically converts to uzivatel.github.io/kontakt.html.
Front Matter: You can add metadata to the beginning of each .md file (e.g., page title or template):
markdown
---
layout: post
title: My first page
---
Here you write classic Markdown text...

Advantages and limitations in 2025:
Automation: Whenever you edit an .md file and save changes (commit), the website automatically updates within moments.
Appearance: Without a selected theme, the website will look like plain text. It is therefore recommended to always select a theme in the Pages settings.
Advanced tools: For documentation, you can also use specialized generators like mdBook, which also work purely with Markdown and are supported by GitHub.
# GitHub Pages
[j-ochmann.github.io](https://j-ochmann.github.io/)
- uses Jekyll and GitHub Actions.
- **docs/index.md** is converted from Markdown to HTML and wrapped in the default Jekyll theme.

## How to change the theme (fastest way)
In the repository root (or in /docs) create or modify the file:
**📄 _config.yml**
```yaml
title: Jindřich Ochmann
description: Development, languages, projects
theme: jekyll-theme-hacker
```
Commit → push → done.

A few usable themes: `jekyll-theme-minimal/hacker/cayman/midnight/slate/dinky`

👉 [Complete list](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?versionId=free-pro-team%40latest&productId=pages&restPage=getting-started-with-github-pages%2Cconfiguring-a-publishing-source-for-your-github-pages-site#supported-themes)

## How to INFLUENCE CONTENT (structure)

Recommended structure:
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
title: Introduction
---

# Hello 👋
My name is **Jindřich Ochmann**

- programming
- languages
- experiments
```
>⚠️ That YAML block (---) is important

## Navigation (top menu)

In `_config.yml`:
```yaml
title: Jindřich Ochmann
theme: jekyll-theme-cayman

nav:
  - title: Home
    url: /
  - title: Projects
    url: /projects
  - title: About me
    url: /about
```
And corresponding files:
```text
projects.md
about.md
```
## Custom CSS (this is where "control" begins)
1. Create file: `docs/assets/css/style.scss`
2. Content:
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
- recognizes SCSS
- translates it
- overwrites default theme style

## If you want FULL control
- do not use "remote theme"
1. create layout:
```html
docs/_layouts/default.html

<!DOCTYPE html>
<html lang="en">
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
2. In _config.yml delete theme:

No Jekyll magic, just a clean static website.

Markdown → HTML → Your layout
