const iconPaths = {
  portfolio: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6 9v9M6 6v.01M10 18v-5a4 4 0 0 1 8 0v5M10 9v9" />
    </>
  ),
  resume: (
    <>
      <path d="M6 2h8l4 4v16H6zM14 2v5h5M9 13h6M9 17h6M9 9h2" />
    </>
  ),
  github: (
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 2a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2" />
  ),
};

export function LinkIcon({ name }) {
  return (
    <span className="link-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[name]}
      </svg>
    </span>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function LinkCard({ link, title, shape, theme, onEdit }) {
  const isExternal = link.url.startsWith("http");

  return (
    <div
      className="link-card-shell"
      style={{
        "--card-background": theme.background,
        "--card-text": theme.text,
      }}
    >
      <a
        className="link-card"
        data-shape={shape}
        href={link.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        download={link.download}
        aria-label={`${title}: ${link.description}${isExternal ? " (opens in a new tab)" : ""}`}
      >
        <LinkIcon name={link.icon} />
        <span className="link-content">
          <span className="link-title">{title}</span>
          <span className="link-description">{link.description}</span>
        </span>
      </a>

      <button
        className="link-menu-button"
        type="button"
        aria-label={`Customize ${title}`}
        onClick={onEdit}
      >
        <MoreIcon />
      </button>
    </div>
  );
}

export default LinkCard;
