const AboutSection = () => {
  return (
    <section className="grid grid-cols-5 gap-8 px-8 py-32">
      <div className="col-start-2 col-span-2 mb-16">
        <h2 className="title mb-10">Deux frères, deux artisans du web.</h2>
        <p>
          Fondé par deux frères passionnés, Cascade incarne leur volonté de
          faire passer les sites et interfaces web dans une nouvelle ère, tant
          en termes de design que de performance. Conscients de la complexité
          des services de l’industrie du web et de l’opacité liée à ses coûts
          (tel que l’hébergement et la maintenance) nous nous engageons à offrir
          une structure de prix réduite et transparente.
        </p>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-8">
        <div className="flex items-start justify-between">
          <img
            src="./imgs/adrien-illustration.svg"
            alt="Adrien illustration"
            className="flex-shrink w-full max-w-[100px] h-auto mt-2"
          />
          <h3 className="ml-auto font-bold ">Adrien</h3>
        </div>
        <p className="col-span-2">
          Initialement formé à l’informatique, Adrien a enrichi son parcours par
          un Master en Design Graphique et Intéractivité à l’École Supérieure
          d’Art et de Design Graphique Le Havre-Rouen afin d’acquérir une double
          compétence en design et développement web.
          <br /> Avec plus de 10 ans d'expérience en agence puis en tant que
          freelance, il excelle grâce à sa veille des tendances design et
          technologies web, assurant une innovation constante dans ses projets.
        </p>
      </div>
      <div className="col-start-2 col-span-3 grid grid-cols-3 gap-8">
        <div className="flex items-start justify-between">
          <img
            src="./imgs/clement-illustration.svg"
            alt="Clément illustration"
            className="flex-shrink w-full max-w-[70px] h-auto mt-2"
          />
          <h3 className="ml-auto font-bold ">Clément</h3>
        </div>
        <p className="col-span-2">
          Diplômé de l’EDHEC Business School avec une expérience en conseil chez
          Sopra Steria et Deloitte, Clément s’est orienté vers le domaine du web
          poussé par sa passion du code et son désir de créativité.
          <br /> Il mise sur une écoute attentive et une communication claire
          pour guider ses clients, tirant parti de son expérience variée pour
          répondre avec agilité et pédagogie à leurs besoins.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
