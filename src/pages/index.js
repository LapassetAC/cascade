'use client';

import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import { cn } from "@/lib/utils";
import { cascadeDelay } from "@/lib/animations";

export default function Home({ projects, isFromPage }) {
  return (
    <div className="min-h-screen text-white">
      {/* Projects Section */}
      <div className="container mx-auto px-4">
        <section className="py-8 md:py-12 lg:py-16">
          <ProjectsSection projects={projects} isFromPage={isFromPage} />
        </section>

        {/* About Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
            <h2 className={cn(
              "text-2xl md:text-3xl font-black mb-4 md:mb-0",
              !isFromPage && "animate-fade-in",
              `[--animation-delay:${cascadeDelay(1)}]`
            )}>
              Deux frères, deux&nbsp;artisans&nbsp;du&nbsp;web.
            </h2>
            <p className={cn(
              "md:col-span-3 mb-6 md:mb-8",
              !isFromPage && "animate-fade-in",
              `[--animation-delay:${cascadeDelay(2)}]`
            )}>
              Fondé par deux frères passionnés se définissant comme artisans du web,
              le studio Cascade incarne leur volonté de faire passer les sites et
              interfaces dans une nouvelle ère, tant en termes de design que de
              performance énergétique. Conscients de la complexité des services du
              secteur et de l'opacité liée à ses coûts (hébergement, maintenance,
              etc.) nous nous engageons à offrir une structure de prix réduite et
              transparente.
            </p>
            <div className="md:col-span-3 space-y-8">
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(3)}]`
              )}>
                <h3 className="text-xl font-black">Adrien</h3>
                <p>
                  Initialement formé à l'informatique, Adrien a enrichi son parcours par
                  un Master en Design Graphique et Interactivité à l'École Supérieure
                  d'Art et de Design Graphique Le Havre-Rouen afin d'acquérir une double
                  compétence en design et développement web. <br />
                  Avec plus de 7 ans d'expérience en freelance, il excelle grâce à sa
                  veille des tendances design et technologies web, assurant une
                  innovation constante dans ses projets.
                </p>
              </div>
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(4)}]`
              )}>
                <h3 className="text-xl font-black">Clément</h3>
                <p>
                  Diplômé de l'EDHEC (Master en Business Management et MSc en Stratégie,
                  Organisations & Conseil) avec une expérience en conseil chez Sopra
                  Steria et Deloitte, Clément s'est orienté vers le domaine du web
                  poussé par sa passion du code et son désir de créativité. <br />
                  Il mise sur une écoute attentive et une communication claire pour
                  guider ses clients, tirant parti de son expérience variée pour
                  répondre avec agilité et pédagogie à leurs besoins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
            <h2 className={cn(
              "text-2xl md:text-3xl font-black mb-4 md:mb-0",
              !isFromPage && "animate-fade-in",
              `[--animation-delay:${cascadeDelay(5)}]`
            )}>
              Revitalisons votre présence digitale.
            </h2>
            <p className={cn(
              "md:col-span-3 mb-8 md:mb-12",
              !isFromPage && "animate-fade-in",
              `[--animation-delay:${cascadeDelay(6)}]`
            )}>
              Nous accompagnons nos clients à travers toutes les étapes de leur
              projet : de la conception du site jusqu'à sa mise en ligne. Afin de
              répondre précisément aux besoins et à l'autonomie de chaque client,
              nous privilégions une approche personnalisée en créant des designs de
              site uniques et en développant l'outil de gestion du contenu (CMS)
              sur-mesure.
            </p>
            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(7)}]`
              )}>
                <h3 className="text-xl font-black">Identité</h3>
                <ul className="space-y-1">
                  <li>création de logo</li>
                  <li>charte graphique</li>
                  <li>rédaction de contenu</li>
                </ul>
              </div>
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(8)}]`
              )}>
                <h3 className="text-xl font-black">Conception</h3>
                <ul className="space-y-1">
                  <li>arborescence</li>
                  <li>maquettage</li>
                  <li>prototypage</li>
                </ul>
              </div>
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(9)}]`
              )}>
                <h3 className="text-xl font-black">Développement</h3>
                <ul className="space-y-1">
                  <li>référencement (SEO)</li>
                  <li>gestion du contenu</li>
                  <li>hébergement</li>
                  <li>mise en ligne</li>
                </ul>
              </div>
              <div className={cn(
                "space-y-2",
                !isFromPage && "animate-fade-in",
                `[--animation-delay:${cascadeDelay(10)}]`
              )}>
                <h3 className="text-xl font-black">Produits</h3>
                <ul className="space-y-1">
                  <li>sites vitrines</li>
                  <li>e-commerce</li>
                  <li>blogs</li>
                  <li>applications web</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const projects = await client.fetch(PROJECTS_QUERY);

  return {
    props: {
      projects,
    },
  };
};
