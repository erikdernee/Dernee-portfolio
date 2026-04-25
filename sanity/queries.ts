import { client } from "./client";

export type SanityProject = {
  _id: string;
  order: number;
  title: string;
  subtitle: string;
  brand: string;
  metric: string;
  videoUrl?: string;
  hue: number;
};

const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    _id, order, title, subtitle, brand, metric, videoUrl, hue
  }
`;

export async function getProjects(): Promise<SanityProject[]> {
  if (!client) return [];
  return client.fetch<SanityProject[]>(PROJECTS_QUERY, {}, { next: { revalidate: 60 } });
}
