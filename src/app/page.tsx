import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const projects = await client.fetch(PROJECTS_QUERY);

  return <HomeClient projects={projects} />;
}
