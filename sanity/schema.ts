import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Position in carousel (lower = earlier)",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Shown in the carousel, e.g. "Night Shift"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Blurb",
      type: "text",
      rows: 2,
      description: "One or two sentences shown below the carousel",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand / Client",
      type: "string",
      description: 'e.g. "Samsung"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metric",
      title: "Reach metric",
      type: "string",
      description: 'e.g. "4.2M views"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "Paste a TikTok, Instagram Reel, YouTube Shorts, or Cloudinary URL. Shown as the video thumbnail.",
    }),
    defineField({
      name: "hue",
      title: "Accent hue (0–360)",
      type: "number",
      description: "Controls the color of the phone screen gradient. 18 = warm orange, 200 = blue, 140 = green…",
      initialValue: 18,
      validation: (r) => r.required().min(0).max(360),
    }),
  ],
  orderings: [
    {
      title: "Carousel order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "brand", media: "hue" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Untitled project", subtitle: subtitle ?? "" };
    },
  },
});

export const schemaTypes = [projectSchema];
