import { type SchemaTypeDefinition } from "sanity";

import { project } from "./project";
import { category } from "./category";
import { service } from "./service";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, category, service],
};
