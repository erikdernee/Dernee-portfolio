import { getProjects, type SanityProject } from "@/sanity/queries";
import Portfolio from "@/components/Portfolio";

// Default projects used when Sanity has no data yet (or during local dev without env vars)
const DEFAULT_PROJECTS: SanityProject[] = [
  { _id:"1", order:1,  title:"Night Shift",    brand:"Samsung",  metric:"4.2M views", hue:18,  subtitle:"A 6-part series on creative workers after dark — shot on-device, cut for vertical." },
  { _id:"2", order:2,  title:"Slow Mornings",  brand:"ING",      metric:"2.8M views", hue:42,  subtitle:"Financial wellness reframed as a morning ritual. Hook, breath, payoff in twelve seconds." },
  { _id:"3", order:3,  title:"Signal & Noise", brand:"Vodafone", metric:"6.1M views", hue:200, subtitle:"Launch campaign for a new data plan. POV-style and built around a single repeatable gag." },
  { _id:"4", order:4,  title:"Fresh Cut",      brand:"PicNic",   metric:"3.4M views", hue:140, subtitle:"Weekly recipe drops filmed in under an hour — made to feel unscripted, planned to the second." },
  { _id:"5", order:5,  title:"After Hours",    brand:"Axe",      metric:"5.7M views", hue:300, subtitle:"A dating-scene satire that rode a platform trend without ever naming it." },
  { _id:"6", order:6,  title:"Shelf Life",     brand:"Bol",      metric:"1.9M views", hue:60,  subtitle:"Unboxings that don't feel like ads — products staged as small character studies." },
  { _id:"7", order:7,  title:"Loose Ends",     brand:"Samsung",  metric:"3.1M views", hue:260, subtitle:"A stitched response format that turned audience comments into the next week's content." },
  { _id:"8", order:8,  title:"Quiet Parts",    brand:"ING",      metric:"2.2M views", hue:12,  subtitle:"Long-form financial advice compressed into punchy 30s monologues. Calm over loud." },
  { _id:"9", order:9,  title:"Fieldwork",      brand:"Vodafone", metric:"4.8M views", hue:170, subtitle:"Documentary shorts on small-business owners using the network in unexpected ways." },
  { _id:"10",order:10, title:"Counterweight",  brand:"PicNic",   metric:"3.7M views", hue:85,  subtitle:"A challenge-style format built to generate UGC — 400+ creator duets in the first week." },
];

export const revalidate = 60; // ISR: re-fetch from Sanity at most every 60s

export default async function Home() {
  let projects: SanityProject[] = DEFAULT_PROJECTS;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const fetched = await getProjects();
      if (fetched.length > 0) projects = fetched;
    } catch {
      // Fall back to defaults if Sanity isn't configured yet
    }
  }

  return <Portfolio projects={projects} />;
}
