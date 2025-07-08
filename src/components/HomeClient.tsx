"use client";

import { useRef, useState } from "react";
import { Project } from "@/types/project";
import CascadeLogo from "@/components/CascadeLogo";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import HeroSection from "@/components/HeroSection";
import CalModal from "@/components/CalModal";
import TallyModal from "@/components/TallyModal";
import { scrollToTop } from "@/utils/scrollTo";
import { useHeaderColorChange } from "@/hooks/useHeaderColorChange";
import { useFooterIntersection } from "@/hooks/useFooterIntersection";
import CascadeFlow from "./CascadeFlow";
import NosSolutionsSection from "./NosSolutionsSection";

export default function HomeClient({ projects }: { projects: Project[] }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);

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

  const openCalModal = () => setIsCalModalOpen(true);
  const closeCalModal = () => setIsCalModalOpen(false);
  const openTallyModal = () => setIsTallyModalOpen(true);
  const closeTallyModal = () => setIsTallyModalOpen(false);

  return (
    <>
      {/* Mobile header */}
      <header
        className="sticky top-0 mb-4 md:mb-0 p-4 flex justify-between items-center md:hidden md:col-span-1 z-30"
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
        {/* <a
          href="#footer"
          className="font-bold -m-4 p-4 md:hidden"
          onClick={scrollToFooter}
        >
          Contact
        </a> */}
      </header>

      {/* Desktop header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 px-4 md:p-8 items-start">
        {/* Main content */}
        <HeroSection
          onOpenCalModal={openCalModal}
          onOpenTallyModal={openTallyModal}
          project={projects[0]}
        />

        {/* End of Main content */}
      </div>

      <CascadeFlow />
      <NosSolutionsSection />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 px-4 md:p-8 items-start">
        <div className="md:col-start-2 md:col-span-3 flex flex-col gap-4 md:gap-32">
          <ProjectsSection projects={projects} />
        </div>
      </div>
      <div ref={skillsSectionRef}>
        <SkillsSection />
      </div>
      <AboutSection />
      <div ref={footerRef}>
        <Footer />
      </div>

      <CalModal isOpen={isCalModalOpen} onClose={closeCalModal} />
      <TallyModal isOpen={isTallyModalOpen} onClose={closeTallyModal} />
    </>
  );
}
