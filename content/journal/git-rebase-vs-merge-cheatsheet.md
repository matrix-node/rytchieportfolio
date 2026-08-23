---
title: "Quick Fix: Git Rebase vs Merge Cheatsheet"
excerpt: A mental model for when to use git rebase to keep a linear history, versus when a merge commit is actually beneficial for preserving context.
date: "2023-10-24"
updated: "2023-10-27"
tags: [Git, Workflow]
---

Choosing between `git merge` and `git rebase` often causes confusion, especially for newer developers. Both integrate changes from one branch into another, but they do it in fundamentally different ways. This cheatsheet aims to clarify when to use which.

| Feature | Merge | Rebase |
| ------- | ----- | ------ |
| Action | Combines two branches, creating a new merge commit. | Moves or combines a sequence of commits to a new base commit. |
| History | Preserves exact history (non-destructive). Shows when integration happened. | Rewrites history (destructive). Creates a clean, linear project history. |
| Conflict Resolution | Resolve all conflicts at once in the merge commit. | Resolve conflicts commit-by-commit during the rebase process. |
| Best For | Pulling changes from a shared branch (e.g., `main`). Completing a feature. | Updating a local, unshared feature branch with latest `main` changes. Cleaning up local commits before pushing. |

> [!WARNING] Golden Rule of Rebasing
> Never rebase commits that exist outside your repository (e.g., public branches that other developers are working on). Rebasing rewrites history, and rewriting public history is a recipe for disaster.

## Common Commands

```bash title="bash — standard merge"
# Switch to main branch
git checkout main

# Merge feature-branch into main
git merge feature-branch
```

```bash title="bash — rebase feature branch"
# Stay on your feature branch
git checkout feature-branch

# Fetch latest changes and rebase onto main
git fetch origin
git rebase origin/main

# If conflicts occur, resolve them, then:
# git add <resolved-file>
# git rebase --continue
```
