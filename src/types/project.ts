/** Data used to render a card on the home page */
export type ProjectCardType = {
  projectName: string;
  description: string;
  url: string;
  cardImage: string;
  technologies: string[];
  tags: string[];
};

/** A single control entry in the project-information.json controls array */
export type ControlSchema =
  | { type: "slider"; key: string; label: string; default: number; min: number; max: number; step?: number }
  | { type: "color"; key: string; label: string; default: string }
  | { type: "toggle"; key: string; label: string; default: boolean }
  | { type: "select"; key: string; label: string; default: string; options: { value: string; label: string }[] }
  | { type: "textarea"; key: string; label: string; default: string; rows?: number }
  | { type: "text"; key: string; label: string; default: string }
  | { type: "button"; label: string; actionId: string };

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
  controls?: ControlSchema[];
};
