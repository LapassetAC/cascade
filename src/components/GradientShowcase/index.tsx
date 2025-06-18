"use client";

import CascadeFlow from "./CanvasNoiseGradient";

export default function GradientShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8">
        <div className="md:grid md:grid-cols-5 md:gap-8">
          <div className="md:col-start-1 md:col-span-5">
            <h2 className="title mb-8 text-center">Cascade Flow</h2>
            <p className="text-center mb-12 opacity-80 max-w-3xl mx-auto">
              An organic cascade animation that flows in beautiful blue at its
              heart, gradually transitioning to your background color as it
              spreads outward.
            </p>

            {/* Cascade Flow Animation - Full Width */}
            <div className="h-[60vh] md:h-[70vh] w-full relative">
              <CascadeFlow className="w-full h-full" intensity={0.7} />
            </div>

            <div className="text-center mt-8">
              <p className="opacity-70 text-sm max-w-3xl mx-auto">
                The vibrant blue cascade flows strongest at the center, creating
                a natural focal point that embodies your brand identity. As the
                streams flow outward, they gently dissolve into your
                background—like blue ink gracefully dispersing through clear
                water.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
