import { groq } from "next-sanity";

export const PROJECTS_QUERY = groq`*[_type == "project"] | order(date desc) {
  title,
  url,
  image {
    asset->{
      ...,
      metadata
    }
  },
  "category": categories->title,
  "services": services[]->title,
  date,
}`;
