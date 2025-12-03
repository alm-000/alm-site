export type WorkProject = {
  slug: string;
  name: string;
  role: string;
  bullets: string[];
  image?: string;
};

/**
 * This file now only exports the shared `WorkProject` type.
 * All work project content is stored as MDX files under `content/work`.
 */
