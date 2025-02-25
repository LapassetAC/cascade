import AnimLogo from "./AnimLogo";

const Footer = () => {
  return (
    <div className="md:relative mt-32 p-4 md:p-0">
      <AnimLogo />
      <div className="md:grid grid-cols-5 gap-8 md:px-8 md:absolute bottom-8 md:left-0 w-full">
        <div className="flex flex-col gap-4 col-span-2 xl:col-span-1">
          <a href="mailto:contact@cascadestudio.fr">
            <div>contact@cascadestudio.fr</div>
          </a>
          <a href="tel:+33674626476">06 74 62 64 76</a>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="https://maps.app.goo.gl/ZN8LcTXYFRXWbsFMA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marseille
          </a>
          <a
            href="https://maps.app.goo.gl/zRgt6fsaEa2tVu7BA"
            target="_blank"
            rel="noopener noreferrer"
          >
            La Jarjatte
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href="https://www.linkedin.com/company/cascadestudio"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/le_studio_cascade/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
