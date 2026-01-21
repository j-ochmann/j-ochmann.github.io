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
```bash
sudo apt update
sudo apt install git
```
## Creating a local repository
Go to your project directory:
```bash
cd /path/to/your/project
git init # Initializes Git in the project
git add . # Adds all files to the "staging" area
git commit -m "Initial project commit"
```
## Creating a repository on GitHub
Sign in to GitHub. Click on the new repository "New repository" and name it. 
### Linking and uploading to GitHub
Copy and paste the URL of your GitHub repository.
```bash
git remote add origin github.com:user/repository.git
```
Push (upload) the local code to GitHub:
```bash
git push -u origin main # or master, depending on the name of the main branch
```
If the branch name does not match, an error may occur:
```bash
error: src refspec main does not match any
error: failed to push some refs to 'github.com:user/repository.git'
```
Fix by renaming the current branch master to main:
```bash
git branch -M main
```
Note the commit warning.
- Git automatically set the email.
- If you want GitHub commits to show your correct business card and profile picture, fix it:
  
```bash
git config --global user.name "your name"
git config --global user.email "vas@email.com"
git commit --amend --reset-author
```

## Step 5: SSH Setup (Recommended)
Generate an SSH key: 
```bash
ssh-keygen -t ed25519 -C "your@email.com".
```
- Copy the contents of the file ~/.ssh/id_ed25519.pub.
- Put the key in the GitHub settings (Settings -> SSH and GPG keys).
- After setting up SSH, you can use git@github.com:user/repository.git instead of HTTPS.
