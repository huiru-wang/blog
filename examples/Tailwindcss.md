---
title: TailwindCSS Configuration
category: Frontend
tags: [CSS, TailwindCSS]
publishedAt: '2023-01-02'
description: This is a description. 
---

# Configuration
A guide to configuring and customizing your Tailwind installation.

Because Tailwind is a framework for building bespoke user interfaces, it has been designed from the ground up with customization in mind.

By default, Tailwind will look for an optional tailwind.config.js file at the root of your project where you can define any customizations.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}
```

Every section of the config file is optional, so you only have to specify what you’d like to change. Any missing sections will fall back to Tailwind’s default [configuration](https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js).

## Creating your configuration file

To use a name other than tailwind.config.js, pass it as an argument on the command-line:

```shell
npx tailwindcss init tailwindcss-config.js
```
