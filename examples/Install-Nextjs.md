---
title: How to set up a new Next.js project?
category: Frontend
tags: [JavaScript, Nextjs]
publishedAt: '2023-01-01'
description: This is a description. 
---

# How to set up a new Next.js project

## System requirements

- [Node.js](https://nodejs.org/) 18.18 or later.
- `macOS`, `Windows` (including WSL), and `Linux` are supported.


## Automatic installation

We recommend starting a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run:

```bash
npx create-next-app@latest
```

On installation, you'll see the following prompts:
```shell
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

> Open your package.json file and add the following scripts:
```json {3,5}
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```