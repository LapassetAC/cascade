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
      title: "Identité",
      items: ["Création de logo", "Charte graphique", "Rédaction de contenu"],
    },
    {
      title: "Code",
      items: [
        "Gestion du contenu",
        "Déploiement",
        "Hébergement",
        "Maintenance",
      ],
    },
    {
      title: "Conception",
      items: ["Design UI/UX", "Arborescence", "Maquettage", "Prototypage"],
    },
    {
      title: "Produits",
      items: ["Sites vitrines", "E-commerce", "Blogs", "Applications Web"],
    },
    {
      title: "Stratégie digitale",
      items: ["Référencement (SEO)", "Analyse du trafic", "Publicité en ligne"],
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[url('/imgs/blue-noise.jpg')] dark:bg-[url('/imgs/white-noise.jpg')] bg-repeat text-[#fcfaf7] dark:text-[#0b0bca] relative h-[300vh] mb-[-300px]"
    >
      <div
        ref={skillsContainerRef}
        className="md:grid grid-cols-5 gap-8 px-4 md:px-8 pt-16 md:pt-32 flex flex-col justify-center relative z-10"
      >
        <h2 className="col-start-2 col-span-3 title mb-8">
          Un accompagnement <br />
          de bout en bout
        </h2>
        <p className="col-start-2 col-span-2 mb-8 md:mb-16">
          De l'audit à la mise en ligne, nous vous accompagnons à chaque étape,
          avec la qualité d'une agence et la flexibilité d'un·e freelance.
        </p>
        <div className="col-start-2 col-span-3 grid grid-cols-3 gap-4 md:gap-8 relative">
          <div className="relative z-20">
            <SkillsLogo />
          </div>
          <div className="col-span-2 relative h-32 md:h-40">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                id={`skill-${index}`}
                className="skill-item-container absolute inset-0 flex flex-col justify-center"
              >
                <div className="md:grid md:grid-cols-2 gap-x-4 md:gap-x-8">
                  <div className="skill-title md:text-right font-bold mt-8 md:mt-0">
                    <span className="font-normal mr-2 md:mr-4">
                      {index + 1}.
                    </span>
                    {skill.title}
                  </div>
                  <ul>
                    {skill.items.map((item) => (
                      <li key={item} className="skill-item">
                        {item}
                      </li>
                    ))}
                  </ul>
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
