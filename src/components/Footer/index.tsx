import AnimLogo from "./AnimLogo";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative mt-32 p-4 md:p-0">
      <AnimLogo />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 md:px-8 md:absolute bottom-8 md:left-0 w-full">
        <div className="flex flex-col md:gap-4 md:col-span-2 xl:col-span-1">
          <a href="mailto:contact@cascadestudio.fr">
            <div>contact@cascadestudio.fr</div>
          </a>
          <a href="tel:+33674626476">06 74 62 64 76</a>
        </div>
        <div className="flex flex-col md:gap-4">
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
        <div className="flex flex-col md:gap-4">
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
      <div className="flex flex-row gap-4 absolute bottom-0 right-[15px] md:right-[50px]">
        <Link href="/mentions-legales" className="block mb-2 text-xs">
          Mentions légales
        </Link>
        <p className="text-xs">Cascade © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
