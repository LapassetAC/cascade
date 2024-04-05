import styled, { css } from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import theme from "@/styles/theme";

const StyledContainer = styled.div`
  min-height: ${({ theme }) => `calc(100vh - ${theme.headerHeight}px)`};
  /* padding-top: 60px; */
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  align-items: start;

  .intro {
    grid-column: 1 / 3;
    position: sticky;
    top: 100px;
  }
  .illustration {
    grid-column: 4 / 5;
    position: sticky;
    top: 100px;
    background-color: ${({ theme }) => theme.color.white};
    ${({ $progressInPercent, theme }) =>
      css`
        width: calc(${$progressInPercent}%);
        height: calc(${$progressInPercent}vh - ${theme.headerHeight + 30}px);
      `}/* &:after {
      content: "";
      display: block;
      width: 70px;
      height: 70px;
      background-color: ${({ theme }) => theme.color.white};
    } */
  }
  .expertises {
    grid-column: 5 / 7;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  h2 {
    font-size: 32px;
    font-weight: 900;
    grid-column: 1 / 2;
  }
  ul {
    grid-column: 2/ 3;
    padding-bottom: 100px;
  }
`;

export default function Expertise() {
  const illusInitSize = 18;
  const [progressInPercent, setProgressInPercent] = useState(illusInitSize);
  const ref = useRef();
  const illusRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.abs(
        window.innerHeight -
          ref.current.getBoundingClientRect().height -
          theme.headerHeight
      );
      const scroll = window.scrollY;
      const percent = Math.abs(Math.round((scroll / maxScroll) * 100));
      setProgressInPercent(percent);

      if (percent > illusInitSize) {
        setProgressInPercent(percent);
      } else {
        setProgressInPercent(illusInitSize);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledContainer
      className="grid"
      $progressInPercent={progressInPercent}
      ref={ref}
    >
      <p className="intro">
        Nous accompagnons nos clients à travers toutes les étapes de leur projet
        : de la conception du site jusqu’à sa mise en ligne. Afin de répondre
        précisément aux besoins et à l’autonomie de chaque client, nous
        privilégions une approche personnalisée en créant des designs de site
        uniques et en développant l’outils de gestion du contenu (CMS)
        sur-mesure.
      </p>
      <div className="illustration" ref={illusRef}></div>
      <section className="expertises">
        <h2>Identité</h2>
        <ul>
          <li>création de logo</li>
          <li>charte graphique</li>
          <li>rédaction de contenu</li>
        </ul>
        <h2>Produits</h2>
        <ul>
          <li>sites vitrines</li>
          <li>e-commerce</li>
          <li>blogs</li>
          <li>applications Web</li>
        </ul>
        <h2>Conception</h2>
        <ul>
          <li>arborescence</li>
          <li>maquettage</li>
          <li>prototypage</li>
        </ul>
        <h2>Code</h2>
        <ul>
          <li>référencement (SEO)</li>
          <li>gestion du contenu (CMS)</li>
          <li>hébergement</li>
          <li>mise en ligne</li>
        </ul>
      </section>
    </StyledContainer>
  );
}
