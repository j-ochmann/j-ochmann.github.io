---
layout: default
title: GitHub-Seiten
content_hash: 9f2fa426eb61090916fd65fa993d492f
translation_status: translated
source_hash: 9f2fa426eb61090916fd65fa993d492f
translated_from: en
---
# GitHub-Webseiten
1. Erstellen Sie ein Repository
    - Repository-Name: Benutzername.github.io
    - muss als öffentlich eingestellt sein
    - Aktivieren Sie die Option „README-Datei hinzufügen“.
2. Laden Sie Website-Inhalte hoch
    - index.html (Hauptseite der Website)
    - Änderungen festschreiben, um sie zu speichern.
3. Aktivieren Sie GitHub-Seiten
    - Registerkarte „Einstellungen“ im oberen Menü des Repositorys
    - „Seiten“ im linken Bereich im Abschnitt „Code und Automatisierung“.
    - Wählen Sie unter „Erstellen und Bereitstellen“ unter „Quelle“ die Option „Aus einem Zweig bereitstellen“ aus
    - Wählen Sie in der Dropdown-Liste unter Zweig den Hauptzweig (oder Masterzweig) und den Ordner / (Stammordner) aus
    - Klicken Sie auf die Schaltfläche Speichern.
4. Veröffentlichen Sie die Website
    - Nach dem Speichern erscheint oben im Bereich „Seiten“ eine Leiste mit Informationen zur laufenden Bereitstellung.
    - Innerhalb weniger Minuten (normalerweise bis zu 10) erscheint eine Bestätigung.
      dass die Website online ist, zusammen mit ihrer Adresse: Benutzername.github.io.
## Wichtige Einschränkungen:
GitHub Pages unterstützt nur statische Websites (HTML, CSS, JavaScript, Frameworks wie React oder Angular).
Serverseitige Sprachen wie PHP, Python (Django/Flask) oder Datenbanken werden nicht unterstützt.

## Sie können GitHub-Seiten mit Markdown (.md) erstellen.
   GitHub verfügt über einen integrierten Jekyll-Generator,
   das diese Dateien automatisch in Webseiten umwandelt.

## Hier sind die wichtigsten Möglichkeiten, dies zu tun:
1. Schnelle Methode über die Themenauswahl (am einfachsten)
Diese Methode erfordert keine Codierung, Sie benötigen nur eine .md-Datei:
Erstellen Sie eine README.md- oder index.md-Datei im Repository.
Gehen Sie zu Einstellungen -> Seiten.
Klicken Sie im Abschnitt „Erstellen und Bereitstellen“ auf die Schaltfläche „Design auswählen“ (falls nicht angezeigt, stellen Sie sicher, dass Sie „Aus einem Zweig bereitstellen“ als Quelle festgelegt haben).
Wählen Sie ein Thema aus und bestätigen Sie. GitHub erstellt automatisch eine _config.yml-Datei, die Markdown mit der ausgewählten Vorlage verknüpft.
2. Benutzerdefinierte Struktur mit Jekyll
Wenn Sie mehr Kontrolle über die Website wünschen, können Sie Markdown-Dateien selbst organisieren:
index.md: Wird zur Hauptseite (index.html).
kontakt.md: Konvertiert automatisch in uzivatel.github.io/kontakt.html.
Titelthema: Sie können am Anfang jeder .md-Datei Metadaten hinzufügen (z. B. Seitentitel oder Vorlage):
Abschlag
---
Layout: Beitrag
Titel: Meine erste Seite
---
Hier schreiben Sie klassischen Markdown-Text...

Vorteile und Einschränkungen im Jahr 2025:
Automatisierung: Immer wenn Sie eine .md-Datei bearbeiten und Änderungen speichern (festschreiben), wird die Website innerhalb weniger Augenblicke automatisch aktualisiert.
Aussehen: Ohne ausgewähltes Thema sieht die Website wie einfacher Text aus. Es wird daher empfohlen, in den Seiteneinstellungen immer ein Thema auszuwählen.
Erweiterte Tools: Für die Dokumentation können Sie auch spezialisierte Generatoren wie mdBook nutzen, die ebenfalls rein mit Markdown arbeiten und von GitHub unterstützt werden.
# GitHub-Seiten
[j-ochmann.github.io](https://j-ochmann.github.io/)
- verwendet Jekyll- und GitHub-Aktionen.
- **docs/index.md** wird von Markdown in HTML konvertiert und in das Standard-Jekyll-Design eingebunden.

## So ändern Sie das Thema (am schnellsten)
Erstellen oder ändern Sie im Repository-Stammverzeichnis (oder in /docs) die Datei:
**📄 _config.yml**
„yaml
Titel: Jindřich Ochmann
Beschreibung: Entwicklung, Sprachen, Projekte
Thema: Jekyll-Theme-Hacker
„
Commit → Push → Fertig.

Ein paar verwendbare Themes: „jekyll-theme-minimal/hacker/cayman/midnight/slate/dinky“.

👉 [Abgeschlossen Liste](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll?versionId=free-pr o-team%40latest&productId=pages&restPage=getting-started-with-github-pages%2Cconfiguring-a-publishing-source-for-your-github-pages-site#supported-themes)

## So beeinflussen Sie den Inhalt (Struktur)

Empfohlener Aufbau:
„Text
Dokumente/
├── _config.yml
├── index.md
├── about.md
├── Projekte.md
├── Vermögenswerte/
│ └── img/
└── _layouts/
„
`index.md`
„md
---
Layout: Standard
Titel: Einführung
---

# Hallo 👋
Mein Name ist **Jindřich Ochmann**

- Programmierung
- Sprachen
- Experimente
„
>⚠️ Dieser YAML-Block (---) ist wichtig

## Navigation (oberes Menü)

In „_config.yml“:
„yaml
Titel: Jindřich Ochmann
Thema: Jekyll-Theme-Cayman

Navigation:
  - Titel: Zuhause
    URL: /
  - Titel: Projekte
    URL: /Projekte
  - Titel: Über mich
    URL: /about
„
Und entsprechende Dateien:
„Text
Projekte.md
über.md
„
## Benutzerdefiniertes CSS (hier beginnt „Kontrolle“)
1. Datei erstellen: „docs/assets/css/style.scss“.
2. Inhalt:
„scss
---
---

@import "{{ site.theme }}";

Körper {
  Schriftfamilie: system-ui, serifenlos;
}

h1 {
  Farbe: #ff6600;
}
„
GitHub-Seiten:
- erkennt SCSS
- übersetzt es
– überschreibt den Standarddesignstil

## Wenn Sie die VOLLE Kontrolle wollen
- kein „Remote-Theme“ verwenden
1. Layout erstellen:
```html
docs/_layouts/default.html

<!DOCTYPE html>
<html lang="de">
<Kopf>
  <meta charset="UTF-8">
  <title>{{ page.title }} | {{ site.title }}</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<Körper>

<Kopfzeile>
  <h1>{{ site.title }}</h1>
</header>

<main>
  {{ Inhalt }}
</main>

</body>
</html>
„
2. In _config.yml Theme löschen:

Keine Jekyll-Magie, nur eine saubere statische Website.

Markdown → HTML → Ihr Layout
