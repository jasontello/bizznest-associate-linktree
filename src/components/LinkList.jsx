import LinkCard from "./LinkCard.jsx";

function LinkList({ links, shape, theme }) {
  return (
    <nav className="link-list" aria-label="Jason Tello links">
      {links.map((link) => (
        <LinkCard
          key={link.title}
          link={link}
          shape={shape}
          theme={theme}
        />
      ))}
    </nav>
  );
}

export default LinkList;
