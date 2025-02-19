import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import { Project } from "@/types/project";
import CascadeLogo from "@/components/CascadeLogo";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home({ projects }: { projects: Project[] }) {
  const scrollToFooter = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-8 p-8 items-start ">
        <button
          onClick={scrollToTop}
          className="overflow-y-hidden sticky top-4  -m-4 p-4"
        >
          <CascadeLogo />
        </button>
        <div className="col-span-3 flex flex-col gap-8">
          <h1 className="title">
            Créateurs de sites
            <br /> web engageants
          </h1>
          <h2 className="leading-snug">
            Nous concevons des sites web uniques et performants pour
            <br /> des marques inspirantes.
          </h2>
          <ProjectsSection projects={projects} />
        </div>
        <div className="col-start-5 flex items-start justify-end sticky top-8">
          <button className="font-bold -m-4 p-4" onClick={scrollToFooter}>
            Contact
          </button>
        </div>
      </div>
      <SkillsSection />
      <AboutSection />
      <Footer />
    </>
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
