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
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
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
