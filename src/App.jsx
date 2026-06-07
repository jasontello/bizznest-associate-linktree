import { useEffect, useState } from "react";
import "./App.css";
import LinkCustomizer from "./components/LinkCustomizer.jsx";
import LinkList from "./components/LinkList.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import { links } from "./data/links.js";
import { defaultPreferences, themes } from "./data/themes.js";

const storageKey = "associate-link-style";
const validShapes = new Set(["pill", "rounded", "square"]);

function readSavedPreferences() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey));
    const themeExists = themes.some((theme) => theme.id === saved?.theme);

    return {
      shape: validShapes.has(saved?.shape)
        ? saved.shape
        : defaultPreferences.shape,
      theme: themeExists ? saved.theme : defaultPreferences.theme,
    };
  } catch {
    return defaultPreferences;
  }
}

function App() {
  const [preferences, setPreferences] = useState(readSavedPreferences);
  const activeTheme =
    themes.find((theme) => theme.id === preferences.theme) ?? themes[0];

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
  }, [preferences]);

  function updatePreference(name, value) {
    setPreferences((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="page-shell">
      <div className="page-layout">
        <ProfileHeader />

        <section className="links-panel" aria-labelledby="links-heading">
          <h2 id="links-heading">My links</h2>
          <LinkList
            links={links}
            shape={preferences.shape}
            theme={activeTheme}
          />
          <LinkCustomizer
            preferences={preferences}
            themes={themes}
            onChange={updatePreference}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
