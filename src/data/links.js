const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const links = [
  {
    title: "Portfolio",
    description: "jasontello.com",
    url: "https://jasontello.com",
    icon: "portfolio",
  },
  {
    title: "LinkedIn",
    description: "linkedin.com/in/jason-tello-123888235",
    url: "https://www.linkedin.com/in/jason-tello-123888235/",
    icon: "linkedin",
  },
  {
    title: "Résumé",
    description: "Download my résumé",
    url: publicAsset("JASONTELLO_RESUME_2026.pdf"),
    download: "JASONTELLO_RESUME_2026.pdf",
    icon: "resume",
  },
  {
    title: "GitHub",
    description: "github.com/jasontello",
    url: "https://github.com/jasontello",
    icon: "github",
  },
];
