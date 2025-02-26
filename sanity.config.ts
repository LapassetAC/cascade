"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { frFRLocale } from "@sanity/locale-fr-fr";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Contenu du site")
          .items([
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projets",
              S,
              context,
            }),
          ]);
      },
    }),
    frFRLocale(),
  ],
});
