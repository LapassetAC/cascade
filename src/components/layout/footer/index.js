'use client';

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import JSFooterAnim from "./JSFooterAnim";
import noiseImage from "@/assets/images/noise.png";
import { cn } from "@/lib/utils";

export default function Footer() {
  const router = useRouter();
  const pathname = router.pathname;
  const isCascade = pathname === "/" || pathname === "/contact";
  const isContact = pathname === "/contact";
  const [isScrollSupport, setIsScrollSupport] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/instagram")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  useEffect(() => {
    setIsScrollSupport(CSS.supports("animation-timeline: scroll()"));
  }, []);

  const dropClasses = [
    "clip-path-drop-1",
    "clip-path-drop-2",
    "clip-path-drop-3",
    "clip-path-drop-4",
    "clip-path-drop-5",
  ];

  return (
    <footer
      className={cn(
        "grid grid-cols-5 gap-4 md:gap-8 py-4 md:py-8 mx-4 md:mx-8",
        !isCascade && "bg-transparent",
        isContact ? "bg-blue" : "bg-transparent",
        !isCascade && "md:fixed md:bottom-0 md:left-0 md:right-0"
      )}
      style={{
        backgroundImage: `url(${noiseImage.src})`,
      }}
    >
      {isScrollSupport || isContact ? (
        dropClasses.map((dropClass, index) => (
          <div
            key={index}
            className={cn(
              "h-[calc(100vh-150px)] md:h-[calc(100vh-120px)] bg-current",
              isContact && `animate-drop-in [--animation-delay:${0.1 * (index + 1)}s]`,
              dropClass
            )}
          />
        ))
      ) : (
        isCascade && (
          <JSFooterAnim
            noAnimation={isContact}
            pathname={pathname}
          />
        )
      )}

      <div className="col-span-1 md:col-span-1 row-start-2 md:row-start-1">
        <a href="mailto:contact@cascadestudio.fr" className="block mb-4">
          <span className="email-mobile">Nous écrire</span>
          <span className="email-desktop">contact@cascadestudio.fr</span>
        </a>
        <a href="tel:+33674626476" className="block">06 74 62 64 76</a>
      </div>

      <div className="col-span-1 md:col-span-1 row-start-2 md:row-start-1">
        <a
          href="https://maps.app.goo.gl/ZN8LcTXYFRXWbsFMA"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4"
        >
          Marseille
        </a>
        <a
          href="https://maps.app.goo.gl/zRgt6fsaEa2tVu7BA"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          La Jarjatte
        </a>
      </div>

      <div className="col-span-1 md:col-span-1 row-start-2 md:row-start-1">
        <a
          href="https://www.linkedin.com/company/cascadestudio"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/le_studio_cascade/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
