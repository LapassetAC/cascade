const AboutSection = () => {
  return (
    <section className="md:grid grid-cols-5 gap-8 px-4 md:px-8 py-16 md:py-32 z-10 relative bg-[url('/imgs/white-noise.jpg')] dark:bg-[url('/imgs/blue-noise.jpg')]">
      <div className="col-start-2 col-span-3 mb-16">
        <h2 className="title mb-10">
          Deux frères,
          <br /> deux artisans du web
        </h2>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-4 md:gap-8 mb-16">
        <img
          src="/imgs/avatar-adrien.svg"
          alt="Adrien"
          className="w-36 h-36 justify-self-end relative -top-6"
        />

        <div className="grid-cols-2 md:grid-cols-3 col-span-2">
          <h3 className="grid-cols-2 font-bold mb-4 leading-tight">
            Adrien, de l’informatique au design, un voyage entre code et
            créativité
          </h3>
          <p className="md:grid-cols-3 text-sm">
            Initialement formé à l’informatique, Adrien a enrichi son parcours
            par un Master en Design Graphique et Interactivité afin d’acquérir
            une double compétence en design et développement web. Avec plus de
            10 ans d'expérience en agence puis en tant que freelance, il excelle
            grâce à sa veille des tendances design et technologies web.
          </p>
        </div>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-4 md:gap-8 mt-16 md:mt-0">
        <img
          src="/imgs/avatar-clem.svg"
          alt="Clément"
          className="w-36 h-36 justify-self-end relative -top-6"
        />

        <div className="grid-cols-2 md:grid-cols-3 col-span-2">
          <h3 className="grid-cols-2 font-bold mb-4 leading-tight">
            Clément, un parcours croisé entre stratégie et développement web
          </h3>
          <p className="md:grid-cols-3 text-sm">
            Diplômé de l&apos;EDHEC Business School avec une expérience en
            conseil chez Sopra Steria et Deloitte, Clément s&apos;est orienté
            vers le domaine du web poussé par sa passion du code et son désir de
            créativité.
            <br /> Il mise sur une écoute attentive et une communication claire
            pour guider ses clients, tirant parti de son expérience variée pour
            répondre avec agilité et pédagogie à leurs besoins.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
