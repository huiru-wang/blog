
---
title: Nextjs Introduction
category: Frontend
tags:
  - Nextjs
publishedAt: 2023-06-10
description: Welcome to the Next.js documentation!
---

# What is Next.js?
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.

Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.


# Main Features

Some of the main Next.js features include:

Feature	Description
[Routing](https://nextjs.org/docs/app/building-your-application/routing)	A file-system based router built on top of Server Components that supports layouts, nested routing, loading states, error handling, and more.

[Rendering](https://nextjs.org/docs/app/building-your-application/rendering)	Client-side and Server-side Rendering with Client and Server Components. Further optimized with Static and Dynamic Rendering on the server with Next.js. Streaming on Edge and Node.js runtimes.

[Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)	Simplified data fetching with async/await in Server Components, and an extended fetch API for request memoization, data caching and revalidation.

# System requirements
> Node.js 18.18 or later.
> macOS, Windows (including WSL), and Linux are supported.

## Automatic installation
```shell
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

Next.js uses file-system routing, which means the routes in your application are determined by how you structure your files.

## Create the app directory

Create an `app` folder, then add a `layout.tsx` and `page.tsx` file. These will be rendered when the user visits the root of your application (`/`).

![](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fapp-getting-started.png&w=1920&q=75)

Create a root layout inside app/layout.tsx with the required `<html>` and `<body>` tags:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```


