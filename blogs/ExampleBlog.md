---
title: Nextjs Introduction
category: Frontend
tags:
  - Nextjs
publishedAt: 2023-06-10
description: Next.js is a popular JavaScript framework for building web applications. It's based on React and offers server-side rendering (SSR) and static site generation (SSG) capabilities.
coverImageUrl: https://h8DxKfmAPhn8O0p3.public.blob.vercel-storage.com/docs/light/top-level-folders.png
---

# React Blog

This blog is the official source for the updates from the React team. Anything important, including release notes or deprecation notices, will be posted here first.

You can also follow the [@react.dev](https://bsky.app/profile/react.dev) account on Bluesky, or [@reactjs](https://twitter.com/reactjs) account on Twitter, but you won’t miss anything essential if you only read this blog.


# Sunsetting Create React App

February 14, 2025 by Matt Carroll and Ricky Hanlon

## Limitations of Build Tools 

Create React App and build tools like it make it easy to get started building a React app. After running `npx create-react-app my-app`, you get a fully configured React app with a development server, linting, and a production build.

For example, if you’re building an internal admin tool, you can start with a landing page:

```tsx
export default function App() {
  return (
    <div>
      <h1>Welcome to the Admin Tool!</h1>
    </div>
  )
}
```

## Routing 

Create React App does not include a specific routing solution. If you’re just getting started, one option is to use useState to switch between routes. But doing this means that you can’t share links to your app - every link would go to the same page - and structuring your app becomes difficult over time:

```tsx {7}
import {useState} from 'react';

import Home from './Home';
import Dashboard from './Dashboard';

export default function App() {
  // ❌ Routing in state does not create URLs
  const [route, setRoute] = useState('home');
  return (
    <div>
      {route === 'home' && <Home />}
      {route === 'dashboard' && <Dashboard />}
    </div>
  )
}
```