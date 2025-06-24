const NosSolutionsSection = () => {
  return (
    <section className="md:grid grid-cols-5 gap-8 px-4 md:px-8 py-16 md:py-32">
      <div className="col-start-2 col-span-3">
        <h2 className="title mb-16 md:mb-24">Nos solutions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 col-span-3 gap-8 md:gap-8">
          {/* Card 1 */}
          <div className="flex flex-col col-span-3">
            <h3 className="font-bold mb-4">
              Valoriser votre présence digitale
            </h3>
            <p className="mb-6">
              Nous concevons des sites sur mesure, engageants et performants qui
              traduisent fidèlement votre identité et mettent en valeur ce qui
              vous distingue.
              <br />
              <br />
              En nous immergeant dans votre métier, nous construisons avec vous
              une présence digitale claire, élégante et cohérente.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                Site vitrine
              </span>
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                Identité de marque
              </span>
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                Webdesign
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col col-span-3">
            <h3 className="font-bold mb-4">
              Créer des outils pour votre métier
            </h3>
            <p className="mb-6">
              Vous avez des idées concrètes pour mieux travailler, mais les
              outils manquent ou ne conviennent pas.
              <br />
              <br />
              Nous concevons avec vous des solutions digitales sur mesure, web
              ou mobile, qui répondent à vos besoins réels. De l&apos;analyse au
              déploiement, nous vous aidons à transformer une intuition en un
              outil simple, efficace et adapté.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                Application web
              </span>
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                Conseil digital
              </span>
              <span className="px-3 py-1 text-sm border border-current rounded-full">
                E-commerce
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NosSolutionsSection;
