import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CascadeLogo from "@/components/CascadeLogo";

export const metadata: Metadata = {
  title: "Mentions Légales - Studio Cascade",
  description: "Mentions légales du site Studio Cascade",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Simple Header */}
      <header
        className="sticky top-0 p-4 flex justify-between items-center z-10"
        style={{
          backgroundImage: "var(--background-noise)",
        }}
      >
        <Link href="/" className="overflow-hidden -m-4 p-4">
          <CascadeLogo />
        </Link>
        <Link href="/" className="font-bold -m-4 p-4">
          Accueil
        </Link>
      </header>

      <div className="container mx-auto px-4 py-12 flex-grow">
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
            L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est
            la propriété exclusive de Studio Cascade ou de ses partenaires.
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite, sauf autorisation écrite
            préalable.
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
            Conformément à la loi « Informatique et Libertés » du 6 janvier 1978
            modifiée et au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d'un droit d'accès, de rectification,
            d'opposition et de suppression des données vous concernant.
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

      <Footer />
    </main>
  );
}
