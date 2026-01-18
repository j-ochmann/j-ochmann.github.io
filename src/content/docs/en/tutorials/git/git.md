---
layout: default
title: Git
---
# Git

## Installation (Debian)
```bash
sudo apt update
sudo apt install git
```
## Creating a local repository
Navigate to your project directory:
```bash
cd /path/to/your/project
git init  # Initializes Git in the project
git add . # Adds all files to the "staging" area
git commit -m "Initial project commit"
```
## Creating a repository on GitHub
Log in to GitHub. Click on "New repository" and name it.
### Connecting and uploading to GitHub
Copy and add the URL of your GitHub repository.
```bash
git remote add origin github.com:user/repository.git
```
Push (upload) local code to GitHub:
```bash
git push -u origin main # or master, depending on the name of the main branch
```
If the branch name does not match, an error may appear:
```bash
error: src refspec main does not match any
error: failed to push some refs to 'github.com:user/repository.git'
```
Fix this by renaming the current master branch to main:
```bash
git branch -M main
```
Note the warning on the commit.
- Git automatically set up the email.
- If you want your commits on GitHub to show your correct business card and profile picture, correct this:

```bash
git config --global user.name "your name"
git config --global user.email "your@email.com"
git commit --amend --reset-author
```

## Step 5: Setting up SSH (Recommended)
Generate an SSH key:
```bash
ssh-keygen -t ed25519 -C "your@email.com".
```
- Copy the contents of the ~/.ssh/id_ed25519.pub file.
- Paste the key into GitHub settings (Settings -> SSH and GPG keys).
- After setting up SSH, you can use git@github.com:user/repository.git instead of HTTPS.