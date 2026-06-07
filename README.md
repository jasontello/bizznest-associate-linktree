# BizzNEST Associate Linktree

A responsive Linktree-style personal page built for the BizzNEST Associate
Track Technical Assessment. The project uses Vite, React, and plain CSS.

Live site: https://jasontello.github.io/bizznest-associate-linktree/

## Features

- Profile image, short bio, and personal links
- Responsive mobile and desktop layouts
- Accessible links and keyboard-friendly customizer controls
- Downloadable résumé
- Link Style Customizer with saved preferences

## Run Locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Link Style Customizer

The customizer lets visitors apply one of three shapes and four curated solid
background colors to every link card. Changes appear immediately.

I chose this feature because most Linktree pages offer limited visual control.
It demonstrates a focused use of React state, event handling, dynamic styles,
and browser storage without turning the page into a full design editor.

`App.jsx` owns the current `shape` and `theme` preferences. Button events update
that state, and React passes the selected values to every `LinkCard`. A
`useEffect` saves the preferences to `localStorage`; the state initializer
validates and restores them when the page loads again.

The trickiest part was applying one shared choice to every card while keeping
the components easy to read. The shape uses a `data-shape` attribute, while the
selected theme supplies a small set of CSS custom properties for background,
text, and shadow colors.

## Deployment

The Vite base path is configured for the `bizznest-associate-linktree`
repository. Deploy the current production build to GitHub Pages with:

```bash
npm run deploy
```

## With More Time

I would add automated component tests for preference validation and a small
reset-to-default button. I would also self-host the web fonts to remove the
external font request.
