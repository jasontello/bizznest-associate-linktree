import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkEditor from "./components/LinkEditor.jsx";
import LinkList from "./components/LinkList.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import { links } from "./data/links.js";
import { defaultPreferences, themes } from "./data/themes.js";

const storageKey = "associate-link-style";

function createDefaultCustomizations(theme = defaultPreferences.theme) {
  return Object.fromEntries(
    links.map((link) => [
      link.id,
      {
        title: link.title,
        theme,
      },
    ]),
  );
}

function readSavedPreferences() {
  const defaults = createDefaultCustomizations();

  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey));
    const fallbackTheme = themes.some((theme) => theme.id === saved?.theme)
      ? saved.theme
      : defaultPreferences.theme;

    const customizations = Object.fromEntries(
      links.map((link) => {
        const savedLink = saved?.links?.[link.id];
        const savedTheme = themes.some(
          (theme) => theme.id === savedLink?.theme,
        )
          ? savedLink.theme
          : fallbackTheme;
        const savedTitle =
          typeof savedLink?.title === "string" && savedLink.title.trim()
            ? savedLink.title.slice(0, 28)
            : defaults[link.id].title;

        return [
          link.id,
          {
            title: savedTitle,
            theme: savedTheme,
          },
        ];
      }),
    );

    return { links: customizations };
  } catch {
    return { links: defaults };
  }
}

function App() {
  const [preferences, setPreferences] = useState(readSavedPreferences);
  const [editorState, setEditorState] = useState(null);
  const editorOpenRef = useRef(false);
  const returnFocusRef = useRef(null);
  const editingLinkId = editorState?.linkId ?? null;
  const editingLink = links.find((link) => link.id === editingLinkId);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (!editorState && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [editorState]);

  const closeEditor = useCallback(() => {
    returnFocusRef.current = editorState?.triggerElement ?? null;

    setPreferences((current) => {
      if (!editingLinkId || current.links[editingLinkId].title.trim()) {
        return current;
      }

      const fallbackTitle =
        links.find((link) => link.id === editingLinkId)?.title ?? "Link";

      return {
        ...current,
        links: {
          ...current.links,
          [editingLinkId]: {
            ...current.links[editingLinkId],
            title: fallbackTitle,
          },
        },
      };
    });
    setEditorState(null);
    editorOpenRef.current = false;
  }, [editingLinkId, editorState?.triggerElement]);

  function openEditor(linkId, origin) {
    if (editorOpenRef.current) {
      return;
    }

    editorOpenRef.current = true;
    setEditorState({ linkId, ...origin });
  }

  function updateLink(linkId, changes) {
    setPreferences((current) => ({
      ...current,
      links: {
        ...current.links,
        [linkId]: {
          ...current.links[linkId],
          ...changes,
        },
      },
    }));
  }

  function applyThemeToAll(theme) {
    setPreferences((current) => ({
      ...current,
      links: Object.fromEntries(
        Object.entries(current.links).map(([linkId, customization]) => [
          linkId,
          { ...customization, theme },
        ]),
      ),
    }));
  }

  return (
    <main className="page-shell">
      <div className="page-layout">
        <ProfileHeader />

        <section className="links-panel" aria-labelledby="links-heading">
          <div className="links-heading-row">
            <h2 id="links-heading">Links</h2>
            <p>Use the menu on any card to personalize it.</p>
          </div>
          <LinkList
            links={links}
            customizations={preferences.links}
            themes={themes}
            editingLinkId={editingLinkId}
            onEdit={openEditor}
          />
        </section>
      </div>

      {editingLink ? (
        <LinkEditor
          key={editingLink.id}
          link={editingLink}
          customization={preferences.links[editingLink.id]}
          origin={editorState}
          themes={themes}
          onNameChange={(title) => updateLink(editingLink.id, { title })}
          onThemeChange={(theme) => updateLink(editingLink.id, { theme })}
          onApplyThemeToAll={applyThemeToAll}
          onClose={closeEditor}
        />
      ) : null}
    </main>
  );
}

export default App;
