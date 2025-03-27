"use client";

import { useRef } from "react";
import CascadeLogo from "@/components/CascadeLogo";
import Footer from "@/components/Footer";
import { scrollToFooter, scrollToTop } from "@/utils/scrollTo";
import { useFooterIntersection } from "@/hooks/useFooterIntersection";
import Link from "next/link";
export default function ClientMentionsLegales() {
  const logoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useFooterIntersection({
    logoRef,
    contactRef,
    footerRef,
  });

  return (
    <>
      {/* Mobile header */}
      <header
        className="sticky top-0 mb-4 md:mb-0 p-4 flex justify-between items-center md:hidden md:col-span-1 z-10"
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
        <a
          href="#footer"
          className="font-bold -m-4 p-4 md:hidden"
          onClick={scrollToFooter}
        >
          Contact
        </a>
      </header>

      {/* Desktop header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 px-4 md:p-8 items-start">
        <div className="hidden md:block md:col-span-1">
          <button
            onClick={scrollToTop}
            className="overflow-hidden fixed top-8 -m-4 p-4"
          >
            <Link href="/" ref={logoRef}>
              <CascadeLogo />
            </Link>
          </button>
        </div>
        {/* Main content */}
        <div className="md:col-span-3 flex flex-col gap-4 md:gap-8">
          <h1 className="title mb-12">Mentions Légales</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <p className="mb-2">Studio Cascade</p>
            <p className="mb-2">Adresse : Marseille & La Jarjatte</p>
            <p className="mb-2">
              Téléphone : <a href="tel:+33674626476">06 74 62 64 76</a>
            </p>
            <p className="mb-2">
              Email :{" "}
              <a href="mailto:contact@cascadestudio.fr">
                contact@cascadestudio.fr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Directeur de la publication
            </h2>
            <p>
              Le directeur de la publication est le représentant légal de Studio
              Cascade.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <p>Ce site est hébergé par [Nom de l'hébergeur]</p>
            <p>[Adresse de l'hébergeur]</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Propriété intellectuelle
            </h2>
            <p className="mb-4">
              L'ensemble du contenu de ce site (textes, images, vidéos, etc.)
              est la propriété exclusive de Studio Cascade ou de ses
              partenaires. Toute reproduction, représentation, modification,
              publication, adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite, sauf
              autorisation écrite préalable.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de son contenu sera
              considérée comme constitutive d'une contrefaçon et poursuivie
              conformément aux dispositions des articles L.335-2 et suivants du
              Code de Propriété Intellectuelle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Protection des données personnelles
            </h2>
            <p className="mb-4">
              Conformément à la loi « Informatique et Libertés » du 6 janvier
              1978 modifiée et au Règlement Général sur la Protection des
              Données (RGPD), vous disposez d'un droit d'accès, de
              rectification, d'opposition et de suppression des données vous
              concernant.
            </p>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse
              email suivante :{" "}
              <a href="mailto:contact@cascadestudio.fr">
                contact@cascadestudio.fr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p>
              Ce site utilise des cookies à des fins de mesure d'audience et
              d'amélioration de l'expérience utilisateur. Vous pouvez désactiver
              l'utilisation de cookies en paramétrant votre navigateur.
            </p>
          </section>
        </div>
        {/* Main content */}
        <div className="hidden md:flex md:col-start-5 items-start justify-end">
          <a
            href="#footer"
            className="font-bold -m-4 p-4 fixed top-8"
            onClick={scrollToFooter}
          >
            <div ref={contactRef}>Contact</div>
          </a>
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
