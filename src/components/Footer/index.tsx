import AnimLogo from "./AnimLogo";

const Footer = () => {
  return (
    <div className="relative mt-32">
      <AnimLogo />
      <div className="grid grid-cols-5 gap-8 pl-8 absolute bottom-8 left-0 ">
        <div className="flex flex-col gap-4">
          <a href="mailto:contact@cascadestudio.fr">
            {/* <div className="hidden md:block">Nous écrire</div> */}
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
