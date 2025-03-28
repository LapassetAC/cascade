"use client";

import { useRef } from "react";
import { Project } from "@/types/project";
import CascadeLogo from "@/components/CascadeLogo";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import { scrollToFooter, scrollToTop } from "@/utils/scrollTo";
import { useHeaderColorChange } from "@/hooks/useHeaderColorChange";
import { useFooterIntersection } from "@/hooks/useFooterIntersection";

export default function HomeClient({ projects }: { projects: Project[] }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useHeaderColorChange({
    logoRef,
    contactRef,
    skillsSectionRef,
  });

  useFooterIntersection({
    logoRef,
    contactRef,
    footerRef,
  });

  return (
    <>
      {/* Mobile header */}
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

      {/* Desktop header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 px-4 md:p-8 items-start">
        <div className="hidden md:block md:col-span-1">
          <button
            onClick={scrollToTop}
            className="overflow-hidden fixed top-8 -m-4 p-4"
          >
            <div ref={logoRef}>
              <CascadeLogo />
            </div>
          </button>
        </div>
        {/* Main content */}
        <div className="md:col-span-3 flex flex-col gap-4 md:gap-8">
          <h1 className="title">
            Créateurs de sites
            <br className="hidden lg:block" /> web engageants
          </h1>
          <h2 className="leading-snug mb-8 md:mb-16">
            Nous concevons des sites web uniques et performants
            <br className="hidden lg:block" /> pour vous démarquer dans
            l&apos;océan digital.
          </h2>
          <ProjectsSection projects={projects} />
        </div>
        {/* Main content */}
        <div className="hidden md:flex md:col-start-5 items-start justify-end">
          <a
            href="#footer"
            className="font-bold -m-4 p-4 fixed top-8"
            onClick={scrollToFooter}
          >
            <div ref={contactRef}>Contact</div>
          </a>
        </div>
      </div>
      <div ref={skillsSectionRef}>
        <SkillsSection />
      </div>
      <AboutSection />
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
