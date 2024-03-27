import { groq } from "next-sanity";

export const PROJECTS_QUERY = groq`*[_type == "project"] | order(date desc) {
  title,
  url,
  image {
    dominantColor,
    asset->{
      ...,
      metadata
    }
  },
  "videoUrl": video.asset->url,
  "category": categories->title,
  "services": services[]->title,
  date,
}`;
