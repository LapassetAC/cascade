import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsLogo from "./SkillsLogo";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      title: "Identifier l'objectif à partir d'un audit stratégique",
      description:
        "À partir du problème identifié et d'un audit de votre présence digitale (site, réseaux, identité), nous définissons ensemble un objectif clair et le périmètre du projet pour y répondre.",
    },
    {
      title: "Aligner l'identité, l'esthétique et le parcours utilisateur",
      description:
        "Si nécessaire, nous retravaillons votre identité de marque puis nous explorons la direction esthétique la plus pertinente, et enfin nous créons un parcours utilisateur fluide en phase avec vos objectifs",
    },
    {
      title: "Concevoir l'interface et le contenu",
      description:
        "Nous maquettons chaque page dans Figma (au format mobile, tablette, et ordinateur) et vous accompagnons dans la création des contenus pour qu'ils soient clairs, cohérents et impactants.",
      logo: ["figma"],
    },
    {
      title: "Donner vie au site",
      description:
        "Nous codons entièrement votre site avec les technologies les plus performantes du marché pour qu'il soit rapide, engageant, et évolutif.",
      logo: ["github", "nextjs", "tailwindcss", "typescript", "gsap"],
    },
    {
      title: "Livrer et vous accompagner",
      description:
        "Vous gérez facilement vos contenus grâce à une interface simple. Nous assurons la maintenance technique et vous accompagnons dans le temps pour suivre les performances et faire évoluer votre présence en ligne.",
      logo: ["sanity", "vercel"],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const skillsContainer = skillsContainerRef.current;

    if (!section || !skillsContainer) return;

    // Initialize all skills as hidden
    const skillElements = skills.map((_, index) =>
      skillsContainer.querySelector(`#skill-${index}`)
    );

    skillElements.forEach((el) => {
      if (el) {
        gsap.set(el, { opacity: 0, y: -50 });
      }
    });

    if (skillElements[0]) {
      gsap.set(skillElements[0], { opacity: 1, y: 0 });
    }
    // Create a single scroll trigger that manages all skills
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: skillsContainer,
      pinSpacing: false,
      onUpdate: (self) => {
        const totalProgress = self.progress;
        const skillProgress = totalProgress * skills.length;
        let activeSkillIndex = Math.floor(skillProgress);

        // Show the last skill when scroll is complete
        if (totalProgress >= 1) {
          activeSkillIndex = skills.length - 1;
        }

        // Animate all skills
        skillElements.forEach((el, index) => {
          if (el) {
            if (index === activeSkillIndex) {
              // Show active skill with smooth transition
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: true,
              });
            } else {
              // Hide inactive skills with smooth transition
              gsap.to(el, {
                opacity: 0,
                y: 0,
                duration: 0.2,
                ease: "power2.out",
                overwrite: true,
              });
            }
          }
        });
      },
    });

    // Set up ResizeObserver to detect layout changes
    const resizeObserver = new ResizeObserver(() => {
      // Debounce the refresh to avoid excessive calls
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    // Observe changes to the document body (which includes the ProjectsSection)
    resizeObserver.observe(document.body);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      resizeObserver.disconnect();
    };
  }, []);

  // Additional effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[url('/imgs/blue-noise.jpg')] dark:bg-[url('/imgs/white-noise.jpg')] bg-repeat text-[#fcfaf7] dark:text-[#0b0bca] relative h-[400vh] xl:h-[300vh]"
    >
      <div
        ref={skillsContainerRef}
        className="md:grid grid-cols-5 gap-8 px-4 md:px-8 py-16 md:py-32 flex flex-col justify-center relative"
      >
        <h2 className="col-start-2 col-span-3 title mb-8">
          Un accompagnement <br />
          de bout en bout
        </h2>
        <p className="col-start-2 col-span-2 mb-8 md:mb-32">
          De l'audit à la mise en ligne, nous vous accompagnons à chaque étape,
          avec la qualité d'une agence et la flexibilité d'un·e freelance.
        </p>
        <div className="col-start-2 col-span-3 grid grid-cols-3 gap-4 md:gap-8 relative">
          <div className="relative">
            <SkillsLogo />
          </div>
          <div className="col-span-2 relative">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                id={`skill-${index}`}
                className="skill-item-container absolute inset-0 flex flex-col justify-start"
              >
                <div className="md:grid md:grid-cols-2 gap-4 md:gap-8">
                  <div className="skill-title md:text-right font-bold">
                    <span className="font-normal mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    {skill.title}
                  </div>
                  <p className="text-sm pt-2">{skill.description}</p>
                  {skill.logo && (
                    <div className="logos-container flex flex-wrap gap-3 mt-4 justify-end">
                      {skill.logo.map((logo, logoIndex) => (
                        <div
                          key={logoIndex}
                          className="logo-item w-12 h-12 flex items-center justify-center p-1.5"
                        >
                          <img
                            src={`/logos/${logo}.svg`}
                            alt={logo}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
