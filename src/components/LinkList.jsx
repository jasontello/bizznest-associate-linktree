import LinkCard from "./LinkCard.jsx";

function LinkList({
  links,
  customizations,
  themes,
  editingLinkId,
  onEdit,
}) {
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
            theme={theme}
            isEditing={editingLinkId === link.id}
            onEdit={(origin) => onEdit(link.id, origin)}
          />
        );
      })}
    </nav>
  );
}

export default LinkList;
