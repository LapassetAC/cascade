import { createClient } from "@sanity/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import { Project } from "@/types/project";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-03-19",
    useCdn: true,
  });

  const projects = await client.fetch(PROJECTS_QUERY);

  return <HomeClient projects={projects} />;
}
