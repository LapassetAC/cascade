"use client";

import CascadeFlow from "@/components/CanvasNoiseGradient";

interface HeroSectionProps {
  onOpenCalModal: () => void;
}

export default function HeroSection({ onOpenCalModal }: HeroSectionProps) {
  return (
    <div className="col-span-full flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 md:gap-8">
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

        {/* CTA Button */}
        <div className="mb-8 md:mb-16">
          <button
            onClick={onOpenCalModal}
            className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-bold text-lg"
          >
            Nous rencontrer
          </button>
        </div>
      </div>
    </div>
  );
}
