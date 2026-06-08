# BizzNEST Associate Linktree

A responsive Linktree-style personal page built for the BizzNEST Associate
Track Technical Assessment. The project uses Vite, React, and plain CSS.

Live site: https://jasontello.github.io/bizznest-associate-linktree/

## Features

- Profile image, short bio, and personal links
- Responsive mobile and desktop layouts
- Accessible links and keyboard-friendly customizer controls
- Downloadable résumé
- Per-link color and name customization with saved preferences
- Shared pill, rounded, and square card shapes

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
to every link, and choose one of three shared card shapes. Changes appear
immediately.

I chose this feature because most Linktree pages offer limited visual control.
It demonstrates a focused use of React state, event handling, dynamic styles,
and browser storage without turning the page into a full design editor.

`App.jsx` owns the shared shape and each link's title and color. Button and input
events update that state, and React passes the selected values to every
`LinkCard`. A `useEffect` saves the preferences to `localStorage`; the state
initializer validates and restores them when the page loads again.

The trickiest part was supporting both shared and per-link settings while
keeping the state predictable. The shared shape uses a `data-shape` attribute,
while each selected color supplies CSS custom properties for the card
background and readable text color.

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
