import { createClient } from "next-sanity";

export const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-04-25";

// Client is only used at request time when projectId is set.
// During build without env vars, page.tsx skips the fetch entirely.
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
