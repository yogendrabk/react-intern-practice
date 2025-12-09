# Day 2 — Development Tools Setup Guide

**Date:** Tuesday, December 9, 2025  
**Topic:** Essential development tools and their configuration

---

## Overview

Today I learn about tools which is necessary for web developer work. These tools helping me write code faster, manage code changes, and debug problems when something break. I making this guide so if I need to setup same environment in new computer, I can follow this again.

---

## 1. VS Code Setup

### What is VS Code?
VS Code is code editor. It is where I writing all my code. It is like notebook but for programmers — very powerful, very fast, and have many features to help me.

### How to Install?
- Go to [https://code.visualstudio.com](https://code.visualstudio.com)
- Download installer for Windows
- Run installer and follow steps
- Once installed, open VS Code

### Important Extensions to Install

Extensions are like add-ons for VS Code. They making VS Code more powerful and helping my work easier.

#### 1. Prettier
- **Why?** It automatically format my code - make it look clean and organized
- **How to install?** Go to Extensions tab (Ctrl+Shift+X), search "Prettier", click Install
- **What it do?** When I save file (Ctrl+S), Prettier automatically arrange my code nicely

#### 2. ESLint
- **Why?** It finding bugs and bad practice in my code before they become problem
- **How to install?** Extensions (Ctrl+Shift+X), search "ESLint", click Install
- **What it do?** Show red squiggly lines under code that look wrong or not following best practice

#### 3. Auto Rename Tag
- **Why?** In HTML, when I change opening tag like `<div>` to `<section>`, this extension automatically change closing tag also
- **How to install?** Extensions, search "Auto Rename Tag", install
- **What it do?** Save my time from manually changing matching tags

#### 4. Live Server
- **Why?** When I making HTML file, I not want to refresh page manually every time I make change. Live Server do this automatically
- **How to install?** Extensions, search "Live Server", install
- **How to use?** Right-click on HTML file → "Open with Live Server" → Browser will open and update automatically when I save

### VS Code Settings

Good settings to know:
- Tab size: I using 2 spaces (most common in React world)
- Format on Save: Enable so Prettier clean code automatically
- Word Wrap: Enable so long lines not go outside screen

---

## 2. Git Installation and Configuration

### What is Git?
Git is version control system. Think of it like time-machine for code. Every time I make change, I save snapshot of my code with message explaining what I change. If something go wrong, I can go back to old version. Also, Git help me work with team — multiple people can work on same project without overwriting each other's work.

### How to Install Git?
- Go to [https://git-scm.com](https://git-scm.com)
- Download Windows version
- Run installer - can accept all default options
- Open Git Bash or terminal
- Check if installed: type `git --version`

### Git Configuration (MUST DO ONCE)

```bash
git config --global user.name "Yogendra Bk"
git config --global user.email "bkyogendra246@gmail.com"
```

**Why this important?** When I make commit (save change), Git need to know who made this change. This info save in history forever. So it checking my name and email.

### Basic Git Commands I Learning Today

**1. Initialize repository in folder:**
```bash
git init
```
This create `.git` folder which tracking all my changes for this project.

**2. Check status of files:**
```bash
git status
```
This showing which files I change, which files I add, etc.

**3. Add files to staging area:**
```bash
git add filename.txt
```
This telling Git "I preparing this file for saving snapshot". This like putting items in box before I ship them.

**4. Make commit (save snapshot):**
```bash
git commit -m "Message explaining what I change"
```
This saving snapshot of my code with message. This message very important — it helping me (and team) understand what I did.

**5. View commit history:**
```bash
git log
```
This showing all previous snapshots I made.

### Why Each Commit Message Important?
Good message = Easy to find what change I made in past.
Bad message = Confusing and wasting time searching.

Example:
- ❌ Bad: "fixed stuff"
- ✅ Good: "Fix: user cannot login with special characters in password"

---

## 3. Node.js and npm

### What is Node.js?
Node.js is JavaScript runtime. Normally JavaScript running in browser. But Node.js allowing JavaScript to run on computer directly, outside of browser. This very powerful because now I can build tools, servers, and automation using JavaScript.

### What is npm?
npm mean "Node Package Manager". It like app store for JavaScript code. Other developer write code and share on npm. I can install their code and use it in my project, not need to reinvent wheel.

### How to Install Node.js?
- Go to [https://nodejs.org](https://nodejs.org)
- Download LTS (Long Term Support) version for Windows
- Run installer, accept defaults
- **IMPORTANT:** During install, ask to install npm and add to PATH - make sure these checked
- Close all terminals and reopen (so terminal know Node installed)

### Check Installation

```bash
node -v     # Show Node.js version
npm -v      # Show npm version
```

If command not recognized, Node not installed correctly or terminal not restarted.

### Simple Node.js Usage

Create file `hello.js`:
```javascript
console.log("Hello from Node.js!");
```

Run it:
```bash
node hello.js
```

This outputting "Hello from Node.js!" in terminal. That it! I running JavaScript outside browser.

### Using npm to Install Packages

```bash
npm install package-name
```

This downloading code from npm and putting in `node_modules` folder. For React project, I using npm downloading and managing all dependencies.

---

## 4. Browser Developer Tools

Developer Tools (F12 in browser) is very important for web developer. This where I debugging (finding and fixing problems) my code.

### How to Open Developer Tools?
- Press `F12` key
- Or Right-click on page → Inspect
- Or Ctrl+Shift+I (Windows)

### Important Tabs in Developer Tools

#### 1. Elements Tab (or Inspector)
- Showing HTML structure of webpage
- Can click on element in page and see its HTML code
- Can modify HTML in real-time to test changes (this change not save)
- Very useful for understanding structure of page

Example: I click on button in page, and in Elements tab I see `<button class="submit-btn">Click me</button>`

#### 2. Console Tab
- This where error and warning showing if something break
- I can also run JavaScript code directly in console
- Type: `console.log("test")` and press Enter

Example: If JavaScript have error, it showing in console with red X mark and error message telling exactly what wrong.

#### 3. Network Tab
- Showing all files browser downloading (HTML, CSS, JavaScript, images, data from server)
- Can see how long each file taking to load
- Can see HTTP status code (200 = success, 404 = not found, 500 = server error)
- Very useful for debugging why page slow to load

Example: I notice image taking 5 seconds to load - this problem I need fix. Maybe image file too big.

#### 4. Sources Tab
- Showing my source code
- Can add breakpoint (stopping point) to debug
- When code hit breakpoint, I can examine variables and see what value they have
- Then step through code line by line

### Why Developer Tools So Important?

Developer Tools is my best friend. When something not working:
- First place I check is Console to see error message
- Then check Elements to understand HTML structure
- Then use Network to see if data loading correctly
- Then use Sources to debug JavaScript logic

---

## Quick Reference — Tools Setup Checklist

- [ ] Git installed and configured with name and email
- [ ] Node.js and npm installed (verify with `node -v` and `npm -v`)
- [ ] VS Code installed with extensions: Prettier, ESLint, Auto Rename Tag, Live Server
- [ ] Open Developer Tools with F12 and familiar with Elements, Console, Network tabs
- [ ] Created first git repository and made practice commits

---

## Defense Questions and Answers

**Q: Git kina use garchau? (Why do I use Git?)**
A: Git helping me save version history of my code. If I make mistake and code break, I can go back to old version. Also if working with team, Git helping manage who change what and prevent overwriting code.

**Q: npm ko role ke ho? (What is role of npm?)**
A: npm is package manager for JavaScript. It allowing me install libraries and tools that other developer write. Instead of writing everything from scratch, I use npm to install ready-made packages.

**Q: Browser Developer Tools kina important hain? (Why are Developer Tools important?)**
A: Developer Tools helping me understand how my code running in browser. I can see HTML structure (Elements), check for error (Console), monitor network requests (Network), and debug JavaScript (Sources).

**Q: VS Code extensions kina chahiyo? (Why do I need VS Code extensions?)**
A: Extensions making VS Code more powerful and faster. Prettier auto-format code, ESLint catch bugs, Live Server auto-refresh page. Save lot of manual work and help me write better code.

---

*Notes written on December 9, 2025 - First day learning development tools*
