"use client";

import Image from "next/image";
import { Project } from "@/types/project";
import { scrollToTop } from "@/utils/scrollTo";
import { useRef } from "react";
import CascadeLogo from "./CascadeLogo";
import { useHeroVisibility } from "@/hooks/useHeroVisibility";
import { useLogoColorChange } from "@/hooks/useLogoColorChange";

interface HeroSectionProps {
  onOpenCalModal: () => void;
  onOpenTallyModal: () => void;
  project: Project;
}

export default function HeroSection({
  onOpenCalModal,
  onOpenTallyModal,
  project,
}: HeroSectionProps) {
  const { title, image, videoUrl } = project;

  const logoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroVisible = useHeroVisibility({ heroRef });
  const shouldUseWhiteLogo = useLogoColorChange({ logoRef });

  return (
    <div
      ref={heroRef}
      className="col-span-full grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8 mb-32 lg:mb-0"
    >
      <div className="flex flex-col col-span-2 gap-4 md:gap-16">
        <div className="hidden md:block md:col-span-1 mb-2">
          <button
            onClick={scrollToTop}
            className="overflow-hidden fixed top-8 -m-4 p-4 z-30"
          >
            <div ref={logoRef}>
              <CascadeLogo isWhite={shouldUseWhiteLogo} />
            </div>
          </button>
        </div>
        <h1 className="title">
          Créons un site à <br className="hidden lg:block" /> la hauteur de
          votre <br className="hidden lg:block" />
          savoir-faire
        </h1>
        <h2 className="leading-snug">
          Nous concevons des sites web uniques et performants
          <br className="hidden lg:block" /> pour vous démarquer dans
          l&apos;océan digital.
        </h2>
        <div className="mb-8 md:mb-0 grid grid-cols-2 gap-4 text-left">
          <button
            onClick={onOpenCalModal}
            className={`font-bold -m-4 p-4 text-left transition-colors duration-300 ${
              shouldUseWhiteLogo ? "text-white" : "text-[#0b0bca]"
            }`}
          >
            → Nous rencontrer
          </button>
          <button
            onClick={onOpenTallyModal}
            className={`font-bold -m-4 p-4 text-left transition-colors duration-300 ${
              shouldUseWhiteLogo ? "text-white" : "text-[#0b0bca]"
            }`}
          >
            → Estimer mon projet
          </button>
        </div>
      </div>

      <div className="col-span-3 relative aspect-[4/3] lg:aspect-auto overflow-hidden z-10">
        <Image
          className="absolute object-cover"
          src={image.asset.url}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          quality={85}
          alt={title}
          priority
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            className="max-w-[60%] max-h-[70%] w-auto h-auto"
            playsInline
            loop
            muted
            autoPlay
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <aside
        className={`fixed top-4 md:top-8 right-4 md:right-8 flex flex-col gap-1 transition-all duration-200 ease-in-out z-30 ${
          isHeroVisible
            ? "opacity-0 translate-y-[-20px] pointer-events-none"
            : "opacity-100 translate-y-0 pointer-events-auto"
        }`}
      >
        <button
          onClick={onOpenCalModal}
          className={`font-bold -m-4 p-4 text-left md:mb-1 transition-colors duration-300 ${
            shouldUseWhiteLogo ? "text-white" : "text-[#0b0bca]"
          }`}
        >
          → Nous rencontrer
        </button>
        <button
          onClick={onOpenTallyModal}
          className={`hidden md:block  font-bold -m-4 p-4 text-left transition-colors duration-300 ${
            shouldUseWhiteLogo ? "text-white" : "text-[#0b0bca]"
          }`}
        >
          → Estimer mon projet
        </button>
      </aside>
    </div>
  );
}
