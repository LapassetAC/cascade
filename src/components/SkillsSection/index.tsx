import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsLogo from "./SkillsLogo";
import { useGsapAnimation } from "@/hooks/useSkillsAnimation";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
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

  return (
    <section className="md:grid grid-cols-5 gap-8 px-4 md:px-8 py-16 md:py-32 bg-[url('/imgs/blue-noise.jpg')] dark:bg-[url('/imgs/white-noise.jpg')] bg-repeat text-[#fcfaf7] dark:text-[#0b0bca]">
      <div className="col-start-2 col-span-2 mb-8 md:mb-16">
        <h2 className="title mb-10">Revitalisons votre présence digitale</h2>
        <p>
          Nous accompagnons nos clients à travers toutes les étapes de leur
          projet : de la conception du site jusqu&apos;à sa mise en ligne. Afin
          de répondre précisément aux besoins et à l&apos;autonomie de chaque
          client, nous privilégions une approche personnalisée en créant des
          designs de site uniques et en développant l&apos;outils de gestion du
          contenu (CMS) sur-mesure.
        </p>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-4 md:gap-8 ">
        <SkillsLogo />
        <ol id="skills-list" className="col-span-2 grid gap-y-16">
          {skills.map((skill, index) => {
            const elementRef = useGsapAnimation();

            return (
              <li
                key={skill.title}
                ref={elementRef}
                className="overflow-hidden md:grid md:grid-cols-2 gap-x-4 md:gap-x-8"
              >
                <div className="skill-title md:text-right font-bold mt-8 md:mt-0">
                  <span className="font-normal mr-2 md:mr-4">{index + 1}.</span>
                  {skill.title}
                </div>
                <ul>
                  {skill.items.map((item) => (
                    <li key={item} className="skill-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default SkillsSection;
