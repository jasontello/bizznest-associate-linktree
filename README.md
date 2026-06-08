# BizzNEST Associate Linktree

A responsive Linktree-style personal page built for the BizzNEST Associate
Track Technical Assessment using Vite, React, and plain CSS. I built it to
present my real portfolio, LinkedIn, résumé, and GitHub links while demonstrating
responsive design, accessible interaction, React state, and browser storage.

- Live site: https://jasontello.github.io/bizznest-associate-linktree/
- Repository: https://github.com/jasontello/bizznest-associate-linktree

## Features

- Profile image, short bio, and personal links
- Responsive mobile and desktop layouts
- Accessible links and keyboard-friendly customizer controls
- Downloadable résumé
- Per-link color and name customization with saved preferences
- Smooth animated link editor

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

Each link card has a small menu that opens a focused editor. Visitors can change
that card's solid background color, edit its display name inline, apply a color
to every link, and see their changes immediately. The selected color also updates
the editor's Save button so the interface feels visually connected.

I chose this feature because most Linktree pages offer limited visual control.
It demonstrates a focused use of React state, event handling, dynamic styles,
and browser storage without turning the page into a full design editor.

`App.jsx` owns each link's title and color. Button and input events update that
state, and React passes the selected values to every `LinkCard`. A `useEffect`
saves the preferences to `localStorage`; the state initializer validates and
restores them when the page loads again.

The trickiest part was keeping per-link settings predictable while animating the
selected card into the editor. Each selected color supplies CSS custom
properties for the card background and readable text color, while the Web
Animations API handles the opening and closing transition. The dialog also
supports Escape, backdrop closing, reduced-motion preferences, and focus
restoration to the menu button that opened it.

With more time, I would add automated component tests for preference validation,
a reset-to-default button, and self-hosted fonts to remove the external font
request.

## Deployment

The Vite base path is configured for the `bizznest-associate-linktree`
repository. Deploy the current production build to GitHub Pages with:

```bash
npm run deploy
```
