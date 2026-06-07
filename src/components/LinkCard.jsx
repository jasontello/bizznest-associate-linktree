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

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="link-arrow"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function LinkCard({ link, shape, theme }) {
  const isExternal = link.url.startsWith("http");

  return (
    <a
      className="link-card"
      data-shape={shape}
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      download={link.download}
      style={{
        "--card-background": theme.background,
        "--card-text": theme.text,
        "--card-shadow": theme.shadow,
      }}
      aria-label={`${link.title}: ${link.description}${isExternal ? " (opens in a new tab)" : ""}`}
    >
      <span className="link-icon">
        <Icon name={link.icon} />
      </span>
      <span className="link-content">
        <span className="link-title">{link.title}</span>
        <span className="link-description">{link.description}</span>
      </span>
      <ArrowIcon />
    </a>
  );
}

export default LinkCard;
