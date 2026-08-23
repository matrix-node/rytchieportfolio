---
title: Advanced CI/CD Pipelines with GitHub Actions
excerpt: Mastering automated testing, secure secrets management, and multi-environment deployments for modern web applications.
date: "2023-11-05"
updated: "2024-06-18"
tags: [ci-cd, github-actions, devops]
category: Development
badge: evergreen
---

A pipeline is a product: its users are your teammates and your future self. Treat flakiness, long queues, and unclear failures as bugs, not facts of life.

## Pipeline Anatomy

```yaml title=".github/workflows/ci.yml"
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run build
```

The `permissions` block is not optional hygiene — it is the difference between a compromised action token reading your whole org and reading one repository.

## Secrets Done Right

- Scope secrets per-environment, not per-repository dumping ground.
- Use OIDC federation to cloud providers instead of long-lived keys.
- Never echo secrets into logs; GitHub masks them, but transformations (`base64`, substring) leak.

> [!WARNING]
> A `pull_request_target` workflow with a checkout of the PR head is remote code execution on your runner. If you do not know why, do not use that trigger.

## Environments and Gates

GitHub Environments give you required reviewers, deployment branch restrictions, and environment-scoped secrets. Wire them to deployment jobs so production deploys wait for a human when it matters.
