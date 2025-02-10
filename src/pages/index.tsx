import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import { Project } from "@/types/project";
import CascadeLogo from "@/components/CascadeLogo";

export default function Home({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-5 gap-10 p-10">
      <div className="overflow-y-hidden">
        <CascadeLogo />
      </div>
      <div>
        <h1 className="title">Créateurs de sites web engageants</h1>
        <h2>
          Nous concevons des sites web uniques et performants pour des marques
          inspirantes.
        </h2>
        <ProjectsSection projects={projects} />
      </div>
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
