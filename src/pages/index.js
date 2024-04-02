import React, { useState, useEffect, useContext } from "react";
import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import CascadeLogo from "@/components/CascadeLogo";
import styled from "styled-components";
import { textApparitionAnim, fadeIn } from "@/styles/theme";
import { ThemeContext } from "styled-components";

const StyledContainer = styled.div`
  header {
    position: sticky;
    top: 0;
    background-color: ${(props) => props.$bgColor};
    transition: background-color 0.5s ease;
    z-index: 1;
    padding: 30px 30px 0 30px;

    .animationMask {
      padding: 0 0 30px;
      align-items: end;
      overflow-y: hidden;
    }
    a {
      transform: translateY(-50px);
      animation: ${textApparitionAnim} 0.4s forwards;
      &:nth-child(1) {
        grid-column: 1 / 3;
      }
      &:nth-child(2) {
        animation-delay: 2.4s;
      }
      &:nth-child(3) {
        animation-delay: 2.5s;
      }
      &:nth-child(4) {
        animation-delay: 2.6s;
      }
      &:nth-child(5) {
        animation-delay: 2.7s;
      }
    }
  }
  section {
    &.hero {
      margin: 30px 0;
      p {
        overflow-y: hidden;
        &:nth-child(1) {
          grid-column: 1 / 3;
          span {
            display: inline-block;
            transform: translateY(-50px);
            animation: ${textApparitionAnim} 0.4s forwards;
            &:nth-child(1) {
              animation-delay: 0.4s;
            }
            &:nth-child(2) {
              animation-delay: 0.5s;
            }
            &:nth-child(3) {
              animation-delay: 0.6s;
            }
            &:nth-child(4) {
              animation-delay: 0.7s;
            }
          }
        }
        &:nth-child(2) {
          grid-column: 3 / 6;
          opacity: 0;
          animation: ${fadeIn} 0.4s 2s forwards;
        }
      }
    }
  }
  footer {
    svg {
      grid-column: 1 / 8;
      grid-row: 1/2;
      width: 100%;
    }
    div {
      grid-row: 1/2;
      grid-column: 1 / 8;
      align-self: self-end;
    }
  }
`;

export default function Home({ projects }) {
  const theme = useContext(ThemeContext);
  const [bgColor, setBgColor] = useState(theme.color.white);
  const [fontColor, setFontColor] = useState(theme.color.black);
  const [animIsLoaded, setAnimIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimIsLoaded(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const changeColors = (newBgColor, newFontColor) => {
    setBgColor(newBgColor);
    setFontColor(newFontColor);
    document.body.style.color = newFontColor;
    document.body.style.backgroundColor = newBgColor;
  };

  return (
    <StyledContainer $bgColor={bgColor}>
      <header>
        <div className="grid animationMask">
          <a href="">
            <CascadeLogo color={fontColor} />
          </a>
          <a href="">Projets</a>
          <a href="">Savoir-faire</a>
          <a href="">À propos</a>
          <a href="">Contact</a>
        </div>
      </header>
      <section className="grid hero">
        <p>
          <span>Revitalisez </span> <span>votre&nbsp;</span>
          <span> présence </span> <span>digitale.</span>
        </p>
        <p>
          Nous concevons des sites web engageants pour des marques engagées. Nos
          créations se distinguent par leur fluidité, leur respect de
          l'environnement, et leur optimisation pour le référencement naturel
          (SEO).
        </p>
      </section>
      {animIsLoaded && (
        <ProjectsSection projects={projects} changeColors={changeColors} />
      )}
      {animIsLoaded && (
        <footer className="grid">
          <svg
            viewBox="0 0 1380 1012"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="235.995" width="114.999" height="321.997" fill="black" />
            <rect width="91.9991" height="91.9991" fill="black" />
            <rect x="470.984" width="137.999" height="689.993" fill="black" />
            <rect x="705.978" width="160.998" height="873.991" fill="black" />
            <rect x="941.01" width="183.998" height="965.991" fill="black" />
            <rect x="1173" width="206.998" height="1011.99" fill="black" />
          </svg>
          <div>
            <a href="">contact@cascade.fr</a>
            <a href="">+33 (0)6 74 62 64 76</a>
          </div>
          <div>
            <a href="">contact@cascade.fr</a>
            <a href="">+33 (0)6 74 62 64 76</a>
          </div>
          <div>
            <a href="">contact@cascade.fr</a>
            <a href="">+33 (0)6 74 62 64 76</a>
          </div>
        </footer>
      )}
    </StyledContainer>
  );
}

export const getStaticProps = async () => {
  const projects = await client.fetch(PROJECTS_QUERY);

  return {
    props: {
      projects,
    },
  };
};
