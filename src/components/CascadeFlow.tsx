"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CascadeFlow() {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const paths = gsap.utils.toArray(
      logoRef.current.querySelectorAll("path") || [],
    );

    gsap.fromTo(
      paths,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-5 md:gap-8 px-4 md:py-48 col-span-3 items-start overflow-visible gap-16 pb-16">
      <p className="text-[64px] title col-span-3 md:col-start-2 md:col-span-3 lg:mb-16">
        Cascade c&apos;est l&apos;histoire de deux{" "}
        <span className="italic title">frères</span> qui conçoivent le web comme
        un <span className="italic title">artisanat</span> : avec rigueur,
        écoute et soin.
      </p>
      <div className="col-span-1 md:col-start-2 md:col-span-1 flex items-start justify-center">
        <svg
          ref={logoRef}
          width="243"
          height="192"
          viewBox="0 0 243 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current w-full h-auto max-w-[160px]"
        >
          <path d="M32.1669 39.5H59.0005V30.5C59.0005 13.9315 45.569 0.5 29.0005 0.5H0.000488281V1.87841C14.7952 10.0433 26.3253 23.4392 32.1669 39.5Z" />
          <path d="M65.4932 77.5H105V30.5C105 13.9315 91.5688 0.500031 75.0003 0.500031H51.0003V1.81357C59.6869 7.06901 65.4932 16.6065 65.4932 27.5V77.5Z" />
          <path d="M111.493 115.5H151V30.5C151 13.9315 137.569 0.500031 121 0.500031H96.0003V1.23459C105.238 6.34796 111.493 16.1936 111.493 27.5V115.5Z" />
          <path d="M157.493 153.5H197V30.5C197 13.9315 183.569 0.500031 167 0.500031H142V1.23459C151.238 6.34796 157.493 16.1936 157.493 27.5V153.5Z" />
          <path d="M203.493 191.5H243V30.5C243 13.9315 229.569 0.500031 213 0.500031H188V1.23459C197.238 6.34796 203.493 16.1936 203.493 27.5V191.5Z" />
        </svg>
      </div>
      <div className="col-start-2 col-span-2 md:col-start-3 md:col-span-2 flex flex-col gap-8">
        <p>
          Notre volonté est d&apos;être les artisans d&apos;un web mieux conçu
          et plus sobre, où la forme sert le message pour vous offrir la
          visibilité et la crédibilité que vous méritez.
        </p>
        <p>
          Avec des parcours mêlant design, tech et conseil, nous travaillons en
          cascade : chaque étape découle du problème initial et y apporte une
          réponse sur mesure, de la réflexion stratégique à la mise en ligne.
        </p>
      </div>
    </section>
  );
}
