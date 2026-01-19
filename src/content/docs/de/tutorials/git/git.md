---
layout: default
title: Git
content_hash: 4b292a895a9d5dd88aba53e8d3ff85cc
translation_status: translated
source_hash: 4b292a895a9d5dd88aba53e8d3ff85cc
translated_from: cs
---
# Git

## Installation (Debian)
„Bash
Sudo apt-Update
Sudo apt install git
„
## Erstellen eines lokalen Repositorys
Gehen Sie zu Ihrem Projektverzeichnis:
„Bash
cd /path/to/your/project
git init # Initialisiert Git im Projekt
git add . # Fügt alle Dateien zum „Staging“-Bereich hinzu
git commit -m „Erstes Projekt-Commit“
„
## Erstellen eines Repositorys auf GitHub
Melden Sie sich bei GitHub an. Klicken Sie auf das neue Repository „Neues Repository“ und benennen Sie es. 
### Verlinkung und Hochladen auf GitHub
Kopieren Sie die URL Ihres GitHub-Repositorys und fügen Sie sie ein.
„Bash
git remote add origin github.com:user/repository.git
„
Pushen (hochladen) Sie den lokalen Code auf GitHub:
„Bash
git push -u origin main # oder master, abhängig vom Namen des Hauptzweigs
„
Wenn der Filialname nicht übereinstimmt, wird möglicherweise eine Fehlermeldung angezeigt:
„Bash
Fehler: src refspec main stimmt mit keinem überein
Fehler: Einige Refs konnten nicht an „github.com:user/repository.git“ gesendet werden.
„
Behebung durch Umbenennen des aktuellen Zweigs „Master“ in „Main“:
„Bash
git branch -M main
„
Beachten Sie die Commit-Warnung.
- Git hat die E-Mail automatisch festgelegt.
– Wenn Sie möchten, dass GitHub-Commits Ihre korrekte Visitenkarte und Ihr Profilbild anzeigen, beheben Sie Folgendes:
  
„Bash
git config --global user.name „Ihr Name“
git config --global user.email „vas@email.com“
git commit --amend --reset-author
„

## Schritt 5: SSH-Setup (empfohlen)
Generieren Sie einen SSH-Schlüssel: 
„Bash
ssh-keygen -t ed25519 -C „your@email.com“.
„
- Kopieren Sie den Inhalt der Datei ~/.ssh/id_ed25519.pub.
- Geben Sie den Schlüssel in die GitHub-Einstellungen ein (Einstellungen -> SSH- und GPG-Schlüssel).
- Nach dem Einrichten von SSH können Sie git@github.com:user/repository.git anstelle von HTTPS verwenden.
