/** Data used to render a card on the home page */
export type ProjectCardType = {
  projectName: string;
  description: string;
  url: string;
  cardImage: string;
};

/** Full project metadata used on the project detail page */
export type ProjectInfoType = {
  projectName: string;
  description: string;
  date: string;
  githubLink: string;
  inspirationLink?: string;
  inspirationText?: string;
  technologies: string;
  tags?: string[];
};

/** @deprecated use ProjectCardType or ProjectInfoType */
export type ProjectType = ProjectCardType & ProjectInfoType;
