"use client";

import Image from "next/image";
import { Project } from "@/types/project";

interface HeroSectionProps {
  onOpenCalModal: () => void;
  project: Project;
}

export default function HeroSection({
  onOpenCalModal,
  project,
}: HeroSectionProps) {
  const { title, image, videoUrl } = project;

  return (
    <div className="col-span-full grid grid-cols-5 gap-4 md:gap-8">
      <div className="flex flex-col col-span-2 gap-4 md:gap-8">
        <h1 className="title">
          Créons un site à <br className="hidden lg:block" /> la hauteur de
          votre <br className="hidden lg:block" />
          savoir-faire
        </h1>
        <h2 className="leading-snug mb-8 md:mb-16">
          Nous concevons des sites web uniques et performants
          <br className="hidden lg:block" /> pour vous démarquer dans
          l&apos;océan digital.
        </h2>
        <div className="mb-8 md:mb-16">
          <button
            onClick={onOpenCalModal}
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-bold text-lg"
          >
            Nous rencontrer
          </button>
        </div>
      </div>

      <div className="col-span-3 relative">
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
        <div className="overflow-hidden">
          <video
            //   ref={setRefs}
            className="w-full relative p-4 md:p-8 xl:p-16"
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
    </div>
  );
}
