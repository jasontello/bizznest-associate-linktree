import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { LinkIcon, MoreIcon } from "./LinkCard.jsx";

const motionTiming = {
  duration: 400,
  easing: "cubic-bezier(0.19, 1, 0.22, 1)",
  fill: "both",
};

function waitForPaint() {
  // Let the restored list card paint before removing the dialog's top layer.
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });
}

function getCloseHandoffDelay() {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--editor-close-handoff-ms");

  return Number.parseInt(value, 10) || 100;
}

function LinkEditor({
  link,
  customization,
  origin,
  themes,
  onNameChange,
  onThemeChange,
  onApplyThemeToAll,
  onClose,
}) {
  const dialogRef = useRef(null);
  const backdropRef = useRef(null);
  const previewRef = useRef(null);
  const returnCardRef = useRef(null);
  const controlsRef = useRef(null);
  const nameInputRef = useRef(null);
  const animationsRef = useRef([]);
  const isClosingRef = useRef(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const activeTheme =
    themes.find((theme) => theme.id === customization.theme) ?? themes[0];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const cancelAnimations = useCallback(() => {
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  }, []);

  const getInverseTransform = useCallback(
    (previewRect, sourceRect = origin.rect) => {
      const scaleX = sourceRect.width / previewRect.width;
      const scaleY = sourceRect.height / previewRect.height;
      const translateX = sourceRect.left - previewRect.left;
      const translateY = sourceRect.top - previewRect.top;

      return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    },
    [origin.rect],
  );

  const completeClose = useCallback(async () => {
    const sourceShell = origin.cardElement?.closest(".link-card-shell");

    if (sourceShell) {
      sourceShell.style.visibility = "visible";
    }

    await waitForPaint();
    await new Promise((resolve) => {
      window.setTimeout(resolve, getCloseHandoffDelay());
    });

    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }

    onClose();
    window.requestAnimationFrame(() => {
      sourceShell?.style.removeProperty("visibility");
    });
  }, [onClose, origin.cardElement]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    const preview = previewRef.current;
    const controls = controlsRef.current;

    dialog.showModal();

    if (prefersReducedMotion) {
      return () => {
        if (dialog.open) {
          dialog.close();
        }
      };
    }

    const previewRect = preview.getBoundingClientRect();
    // FLIP keeps the opening motion tied to the card the user selected.
    const inverseTransform = getInverseTransform(previewRect);
    const previewAnimation = preview.animate(
      [
        {
          transform: inverseTransform,
          borderRadius: origin.borderRadius,
        },
        {
          transform: "none",
          borderRadius: window.getComputedStyle(preview).borderRadius,
        },
      ],
      motionTiming,
    );
    const backdropAnimation = backdrop.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 200, easing: "ease-out", fill: "both" },
    );
    const controlsAnimation = controls.animate(
      [
        { opacity: 0, filter: "blur(10px)", transform: "translateY(24px)" },
        { opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
      ],
      {
        duration: 320,
        delay: 100,
        easing: motionTiming.easing,
        fill: "both",
      },
    );

    animationsRef.current = [
      previewAnimation,
      backdropAnimation,
      controlsAnimation,
    ];

    return () => {
      cancelAnimations();
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [
    cancelAnimations,
    getInverseTransform,
    origin.borderRadius,
    prefersReducedMotion,
  ]);

  const requestClose = useCallback(async () => {
    if (isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;

    if (prefersReducedMotion) {
      await completeClose();
      return;
    }

    const backdrop = backdropRef.current;
    const preview = previewRef.current;
    const returnCard = returnCardRef.current;
    const controls = controlsRef.current;
    const previewRect = preview.getBoundingClientRect();
    const sourceRect =
      origin.cardElement?.getBoundingClientRect() ?? origin.rect;
    const currentBackdropOpacity = window.getComputedStyle(backdrop).opacity;
    const currentControls = window.getComputedStyle(controls);

    cancelAnimations();

    const previewAnimation = preview.animate(
      [
        { opacity: 1, filter: "blur(0)" },
        { opacity: 0, filter: "blur(8px)" },
      ],
      { duration: 120, easing: "ease-in", fill: "both" },
    );
    const returnCardAnimation = returnCard.animate(
      [
        {
          top: `${previewRect.top}px`,
          left: `${previewRect.left}px`,
          width: `${previewRect.width}px`,
          height: `${previewRect.height}px`,
          opacity: 1,
          borderRadius: window.getComputedStyle(preview).borderRadius,
        },
        {
          top: `${sourceRect.top}px`,
          left: `${sourceRect.left}px`,
          width: `${sourceRect.width}px`,
          height: `${sourceRect.height}px`,
          opacity: 1,
          borderRadius: origin.borderRadius,
        },
      ],
      motionTiming,
    );
    const backdropAnimation = backdrop.animate(
      [{ opacity: currentBackdropOpacity }, { opacity: 0 }],
      { duration: 200, easing: "ease-in", fill: "both" },
    );
    const controlsAnimation = controls.animate(
      [
        {
          opacity: currentControls.opacity,
          filter: currentControls.filter,
          transform: currentControls.transform,
        },
        { opacity: 0, filter: "blur(10px)", transform: "translateY(24px)" },
      ],
      {
        duration: 180,
        easing: "ease-in",
        fill: "both",
      },
    );

    animationsRef.current = [
      previewAnimation,
      returnCardAnimation,
      backdropAnimation,
      controlsAnimation,
    ];

    await Promise.allSettled([
      previewAnimation.finished,
      returnCardAnimation.finished,
      backdropAnimation.finished,
      controlsAnimation.finished,
    ]);
    await completeClose();
  }, [
    cancelAnimations,
    completeClose,
    origin,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    const dialog = dialogRef.current;

    function handleCancel(event) {
      event.preventDefault();
      requestClose();
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [requestClose]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditingName]);

  return (
    <dialog
      className="link-editor"
      ref={dialogRef}
      aria-labelledby="link-editor-heading"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          requestClose();
        }
      }}
    >
      <div
        className="link-editor__backdrop"
        ref={backdropRef}
        aria-hidden="true"
        onClick={requestClose}
      />
      <div className="link-editor__layout">
        <div className="link-editor__surface">
          <h2 className="visually-hidden" id="link-editor-heading">
            Customize {customization.title}
          </h2>

          <div
            className="editor-preview"
            ref={previewRef}
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

          <div
            className="editor-return-card"
            ref={returnCardRef}
            aria-hidden="true"
            style={{
              "--card-background": activeTheme.background,
              "--card-text": activeTheme.text,
            }}
          >
            <LinkIcon name={link.icon} />
            <span className="link-content">
              <span className="link-title">{customization.title}</span>
              <span className="link-description">{link.description}</span>
            </span>
            <span className="editor-return-card__menu">
              <MoreIcon />
            </span>
          </div>

          <div className="editor-controls" ref={controlsRef}>
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

            <button
              className="editor-save-button"
              type="button"
              style={{
                "--save-background": activeTheme.background,
                "--save-text": activeTheme.text,
              }}
              onClick={requestClose}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default LinkEditor;
