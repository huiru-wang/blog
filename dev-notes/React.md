---
title: React Quick Start
category: Frontend
tags:
  - React
publishedAt: 2023-06-10
description: This section provides detailed reference documentation for working with React. For an introduction to React, please visit the Learn section.
coverImageUrl: 
---

# Quick Start
Welcome to the React documentation! This page will give you an introduction to 80% of the React concepts that you will use on a daily basis.

```
You will learn
How to create and nest components
How to add markup and styles
How to display data
How to render conditions and lists
How to respond to events and update the screen
How to share data between components
Creating and nesting components 
React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.
```
React components are JavaScript functions that return markup:

```js
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```
Now that you’ve declared MyButton, you can nest it into another component:

```js
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
Notice that `<MyButton />` starts with a capital letter. That’s how you know it’s a React component. React component names must always start with a capital letter, while HTML tags must be lowercase.