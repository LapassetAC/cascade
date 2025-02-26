"use client";

import { Project } from "@/types/project";
import CascadeLogo from "@/components/CascadeLogo";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import { scrollToFooter, scrollToTop } from "@/utils/scrollTo";

export default function HomeClient({ projects }: { projects: Project[] }) {
  return (
    <>
      <header
        className="sticky top-0 mb-4 md:mb-0 p-4 flex justify-between items-center md:hidden md:col-span-1 z-10"
        style={{
          backgroundImage: "var(--background-noise)",
        }}
      >
        <a
          href="#top"
          className="overflow-hidden sticky top-4 -m-4 p-4"
          onClick={scrollToTop}
        >
          <CascadeLogo />
        </a>
        <a
          href="#footer"
          className="font-bold -m-4 p-4 md:hidden"
          onClick={scrollToFooter}
        >
          Contact
        </a>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 px-4 md:p-8 items-start">
        <button
          onClick={scrollToTop}
          className="hidden md:block md:col-span-1 overflow-hidden sticky top-4 -m-4 p-4"
        >
          <CascadeLogo />
        </button>
        <div className="md:col-span-3 flex flex-col gap-4 md:gap-8">
          <h1 className="title">
            Créateurs de sites
            <br className="hidden lg:block" /> web engageants
          </h1>
          <h2 className="leading-snug mb-8 md:mb-0">
            Nous concevons des sites web uniques et performants pour
            <br className="hidden lg:block" /> des marques inspirantes.
          </h2>
          <ProjectsSection projects={projects} />
        </div>
        <div className="hidden md:flex md:col-start-5 items-start justify-end sticky top-8">
          <a
            href="#footer"
            className="font-bold -m-4 p-4"
            onClick={scrollToFooter}
          >
            Contact
          </a>
        </div>
      </div>
      <SkillsSection />
      <AboutSection />
      <Footer />
    </>
  );
}
