import { useEffect, useRef, useState } from "react";
import { LinkIcon } from "./LinkCard.jsx";

const shapes = [
  { id: "pill", label: "Pill" },
  { id: "rounded", label: "Rounded" },
  { id: "square", label: "Square" },
];

function LinkEditor({
  link,
  customization,
  shape,
  themes,
  onNameChange,
  onThemeChange,
  onApplyThemeToAll,
  onShapeChange,
  onClose,
}) {
  const dialogRef = useRef(null);
  const nameInputRef = useRef(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const activeTheme =
    themes.find((theme) => theme.id === customization.theme) ?? themes[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();

    function handleCancel(event) {
      event.preventDefault();
      onClose();
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [onClose]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditingName]);

  function handleBackdropClick(event) {
    if (event.target === dialogRef.current) {
      onClose();
    }
  }

  return (
    <dialog
      className="link-editor"
      ref={dialogRef}
      onClick={handleBackdropClick}
      aria-labelledby="link-editor-heading"
    >
      <div className="link-editor__surface">
        <h2 className="visually-hidden" id="link-editor-heading">
          Customize {customization.title}
        </h2>

        <div
          className="editor-preview"
          data-shape={shape}
          style={{
            "--card-background": activeTheme.background,
            "--card-text": activeTheme.text,
          }}
        >
          <LinkIcon name={link.icon} />

          <div className="editor-preview__copy">
            {isEditingName ? (
              <input
                className="editor-name-input"
                ref={nameInputRef}
                value={customization.title}
                maxLength="28"
                aria-label="Link name"
                onChange={(event) => onNameChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setIsEditingName(false);
                  }
                }}
              />
            ) : (
              <strong>{customization.title}</strong>
            )}
            <span>{link.description}</span>
          </div>

          <button
            className="editor-name-button"
            type="button"
            onClick={() => setIsEditingName((current) => !current)}
          >
            {isEditingName ? "Done" : "Edit name"}
          </button>
        </div>

        <div className="editor-controls">
          <fieldset className="editor-fieldset">
            <legend>Card color</legend>
            <div className="color-options">
              {themes.map((theme) => (
                <button
                  className="color-option"
                  type="button"
                  aria-label={`${theme.label} card`}
                  aria-pressed={customization.theme === theme.id}
                  title={theme.label}
                  onClick={() => onThemeChange(theme.id)}
                  key={theme.id}
                >
                  <span style={{ background: theme.background }} />
                </button>
              ))}
            </div>
            <button
              className="apply-all-button"
              type="button"
              onClick={() => onApplyThemeToAll(customization.theme)}
            >
              Apply this color to all links
            </button>
          </fieldset>

          <fieldset className="editor-fieldset">
            <legend>Card shape</legend>
            <div className="shape-options">
              {shapes.map((shapeOption) => (
                <button
                  className="shape-option"
                  type="button"
                  aria-pressed={shape === shapeOption.id}
                  onClick={() => onShapeChange(shapeOption.id)}
                  key={shapeOption.id}
                >
                  <span
                    className="shape-preview"
                    data-shape={shapeOption.id}
                  />
                  {shapeOption.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="editor-save-button" type="button" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default LinkEditor;
