import SkillsLogo from "./SkillsLogo";

const SkillsSection = () => {
  return (
    <section className="md:grid grid-cols-5 gap-8 px-4 md:px-8 py-32 bg-[url('/imgs/blue-noise.jpg')] dark:bg-[url('/imgs/white-noise.jpg')] bg-repeat text-[#fcfaf7] dark:text-[#0b0bca]">
      <div className="col-start-2 col-span-2 mb-8 md:mb-16">
        <h2 className="title mb-10">Revitalisons votre présence digitale.</h2>
        <p>
          Nous accompagnons nos clients à travers toutes les étapes de leur
          projet : de la conception du site jusqu&apos;à sa mise en ligne. Afin
          de répondre précisément aux besoins et à l&apos;autonomie de chaque
          client, nous privilégions une approche personnalisée en créant des
          designs de site uniques et en développant l&apos;outils de gestion du
          contenu (CMS) sur-mesure.
        </p>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <SkillsLogo />
        <ol
          id="skills-list"
          className="md:col-span-2 md:grid md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-16"
        >
          <li className="md:text-right font-bold mt-8 md:mt-0">
            <span className="font-normal mr-2 md:mr-4">1.</span>
            Identité
          </li>
          <ul>
            <li>création de logo</li>
            <li>Charte graphique</li>
            <li>rédaction de contenu </li>
          </ul>
          <li className="md:text-right font-bold mt-8 md:mt-0">
            <span className="font-normal mr-2 md:mr-4">2.</span>
            Code
          </li>
          <ul>
            <li>référencement (SEO)</li>
            <li>gestion du contenu</li>
            <li>déploiement</li>
            <li>hébergement</li>
          </ul>
          <li className="md:text-right font-bold mt-8 md:mt-0">
            <span className="font-normal mr-2 md:mr-4">3.</span>
            Conception
          </li>
          <ul>
            <li>Design UI/UX</li>
            <li>arborescence</li>
            <li>maquettage</li>
            <li>prototypage</li>
          </ul>
          <li className="md:text-right font-bold mt-8 md:mt-0">
            <span className="font-normal mr-2 md:mr-4">4.</span>
            Produits
          </li>
          <ul>
            <li>sites vitrines</li>
            <li>e-commerce</li>
            <li>blogs</li>
            <li>applications Web</li>
          </ul>
          <li className="md:text-right font-bold mt-8 md:mt-0">
            <span className="font-normal mr-2 md:mr-4">5.</span>
            Stratégie digitale
          </li>
          <ul>
            <li>référencement (SEO)</li>
            <li>gestion du contenu</li>
            <li>déploiement</li>
            <li>hébergement</li>
          </ul>
        </ol>
      </div>
    </section>
  );
};

export default SkillsSection;
