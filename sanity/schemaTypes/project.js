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
      fields: [
        {
          name: "dominantColor",
          title: "Couleur dominante",
          type: "string",
          description:
            "Utiliser : https://onlinejpgtools.com/find-dominant-jpg-colors et sélectionner une couleur sur laquelle la police peut être noire.",
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "video",
      title: "Vidéo démo du projet",
      type: "file",
      description:
        "Vidéo d'une minute maximum, convertir le fichier au format MP4 via cloud convert, preset very slow, resolution 1280x800",
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
      media: "image",
    },
  },
};
