/** Data used to render a card on the home page */
export type ProjectCardType = {
  projectName: string;
  description: string;
  url: string;
  cardImage: string;
  technologies: string[];
  tags: string[];
};

/** Full project metadata used on the project detail page */
export type ProjectInfoType = {
  projectName: string;
  description: string;
  date: string;
  inspirationLink?: string;
  inspirationText?: string;
  technologies: string;
  tags?: string[];
  isInteractive?: boolean;
};

/** Props shared by all project PageClient components */
export type SideMenuInfoProps = {
  projectName: string;
  description: string;
  technologies: string;
  slug: string;
  inspirationLink?: string;
  inspirationText?: string;
};
