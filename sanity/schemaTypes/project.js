export const project = {
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
    },
    {
      name: "url",
      title: "URL du projet",
      type: "url",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "reference", to: { type: "service" } }],
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "MM-YYYY",
        calendarTodayLabel: "Today",
      },
    },
  ],

  orderings: [
    {
      title: "Date",
      name: "date",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
};
