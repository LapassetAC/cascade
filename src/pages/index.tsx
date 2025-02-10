import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import { Project } from "@/types/project";
import Header from "@/components/Header";

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-5 gap-10 p-10">
      <Header />
      <ProjectsSection projects={projects} />
    </div>
  );
}

export const getStaticProps = async () => {
  const projects = await client.fetch(PROJECTS_QUERY);

  return {
    props: {
      projects,
    },
  };
};
