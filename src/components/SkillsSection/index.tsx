import SkillsLogo from "./SkillsLogo";

const SkillsSection = () => {
  return (
    <section className="grid grid-cols-5 gap-8 px-8 py-32 bg-[var(--foreground)] text-[var(--background)]">
      <div className="col-start-2 col-span-2 mb-16">
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
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-8">
        <SkillsLogo />
        <ol id="skills-list" className="col-span-2 grid grid-cols-2 gap-16">
          <li className="text-right font-bold">Identité</li>
          <ul>
            <li>création de logo</li>
            <li>Charte graphique</li>
            <li>Design UI/UX</li>
            <li>rédaction de contenu</li>
          </ul>
          <li className="text-right font-bold">Code</li>
          <ul>
            <li>référencement (SEO)</li>
            <li>gestion du contenu</li>
            <li>déploiement</li>
            <li>hébergement</li>
          </ul>
          <li className="text-right font-bold">Identité</li>
          <ul>
            <li>création de logo</li>
            <li>Charte graphique</li>
            <li>Design UI/UX</li>
            <li>rédaction de contenu</li>
          </ul>
          <li className="text-right font-bold">Code</li>
          <ul>
            <li>référencement (SEO)</li>
            <li>gestion du contenu</li>
            <li>déploiement</li>
            <li>hébergement</li>
          </ul>
          <li className="text-right font-bold">Code</li>
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
