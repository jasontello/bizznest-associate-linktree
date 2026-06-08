import LinkCard from "./LinkCard.jsx";

function LinkList({ links, customizations, shape, themes, onEdit }) {
  return (
    <nav className="link-list" aria-label="Jason Tello links">
      {links.map((link) => {
        const customization = customizations[link.id];
        const theme =
          themes.find((item) => item.id === customization.theme) ?? themes[0];

        return (
          <LinkCard
            key={link.id}
            link={link}
            title={customization.title}
            shape={shape}
            theme={theme}
            onEdit={() => onEdit(link.id)}
          />
        );
      })}
    </nav>
  );
}

export default LinkList;
