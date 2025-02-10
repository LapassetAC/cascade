import { blockContent } from "./schemaTypes/blockContent";
import { project } from "./schemaTypes/project";
import { category } from "./schemaTypes/category";
import { service } from "./schemaTypes/service";

export const schema = {
  types: [project, category, service, blockContent],
};
