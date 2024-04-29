import styled from "styled-components";
import React from "react";

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  align-items: start;
  @media ${({ theme }) => theme.minWidth.sm} {
    padding: 30px 0 140px;
  }
  h1 {
    grid-column: 1 / 2;
    margin-bottom: 15px;
    @media ${({ theme }) => theme.minWidth.sm} {
      margin-bottom: 0;
    }
  }
  .intro {
    grid-column: 1 / 3;
    margin-bottom: 15px;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 2 / 5;
      margin-bottom: 60px;
    }
  }
  .expertises {
    grid-column: 1 / 2;
    @media ${({ theme }) => theme.minWidth.sm} {
      grid-column: 2 / 6;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;
    }
    .services-list {
      margin-bottom: 30px;
      @media ${({ theme }) => theme.minWidth.sm} {
        margin-bottom: 0;
      }
    }
    h2 {
      font-weight: 900;
      margin-bottom: 5px;
    }
  }
`;

export default function Expertise() {
  return (
    <StyledContainer>
      <div className="grid">
        <h1>Revitalisons votre présence digitale.</h1>
        <p className="intro">
          Nous accompagnons nos clients à travers toutes les étapes de leur
          projet : de la conception du site jusqu’à sa mise en ligne. Afin de
          répondre précisément aux besoins et à l’autonomie de chaque client,
          nous privilégions une approche personnalisée en créant des designs de
          site uniques et en développant l’outil de gestion du contenu (CMS)
          sur-mesure.
        </p>
        <section className="expertises">
          <div className="services-list">
            <h2>Identité</h2>
            <ul>
              <li>création de logo</li>
              <li>charte graphique</li>
              <li>rédaction de contenu</li>
            </ul>
          </div>
          <div className="services-list">
            <h2>Conception</h2>
            <ul>
              <li>arborescence</li>
              <li>maquettage</li>
              <li>prototypage</li>
            </ul>
          </div>
          <div className="services-list">
            <h2>Développement</h2>
            <ul>
              <li>référencement (SEO)</li>
              <li>gestion du contenu</li>
              <li>hébergement</li>
              <li>mise en ligne</li>
            </ul>
          </div>
          <div className="services-list">
            <h2>Produits</h2>
            <ul>
              <li>sites vitrines</li>
              <li>e-commerce</li>
              <li>blogs</li>
              <li>applications web</li>
            </ul>
          </div>
        </section>
      </div>
    </StyledContainer>
  );
}
