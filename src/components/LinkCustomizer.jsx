const shapes = [
  { id: "pill", label: "Pill" },
  { id: "rounded", label: "Rounded" },
  { id: "square", label: "Square" },
];

function LinkCustomizer({ preferences, themes, onChange }) {
  return (
    <section className="customizer" aria-labelledby="customizer-heading">
      <h3 className="customizer-heading" id="customizer-heading">
        Link Style Customizer
      </h3>
      <p className="customizer-description">
        Choose a shape and color for every link card.
      </p>

      <fieldset className="customizer-group">
        <legend className="customizer-legend">Shape</legend>
        <div className="shape-options">
          {shapes.map((shape) => (
            <button
              className="customizer-option"
              type="button"
              aria-pressed={preferences.shape === shape.id}
              onClick={() => onChange("shape", shape.id)}
              key={shape.id}
            >
              <span className="shape-preview" data-shape={shape.id} />
              {shape.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="customizer-group">
        <legend className="customizer-legend">Background</legend>
        <div className="theme-options">
          {themes.map((theme) => (
            <button
              className="customizer-option theme-option"
              type="button"
              aria-label={`${theme.label} background`}
              aria-pressed={preferences.theme === theme.id}
              title={theme.label}
              onClick={() => onChange("theme", theme.id)}
              key={theme.id}
            >
              <span
                className="theme-swatch"
                style={{ background: theme.background }}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <p className="saved-note" aria-live="polite">
        Your choices are saved automatically on this device.
      </p>
    </section>
  );
}

export default LinkCustomizer;
