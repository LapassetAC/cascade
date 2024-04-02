import React, { useState, useEffect, useContext } from "react";
import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import CascadeLogo from "@/components/CascadeLogo";
import styled from "styled-components";
import { textApparitionAnim, fadeIn, cascadeDelay } from "@/styles/theme";
import { ThemeContext } from "styled-components";

const StyledContainer = styled.div`
  background-color: ${(props) => props.$bgColor};
  transition: background-color 0.4s;
  header {
    position: sticky;
    top: 0;
    background-color: ${(props) => props.$bgColor};
    transition: background-color 0.4s;
    z-index: 1;
    padding: 30px 0 0;

    .animationMask {
      padding: 0 0 30px;
      align-items: end;
      overflow-y: hidden;
    }
    a {
      transform: translateY(-50px);
      animation: ${textApparitionAnim} 0.4s forwards;
      &.logo {
        grid-column: 1 / 3;
      }
      &:not(.logo) {
        ${cascadeDelay(4, 2)}
      }
    }
  }
  section {
    &.hero {
      /* margin: 30px 0; */
      height: calc(100vh - 180px);
      p {
        overflow-y: hidden;
        &:nth-child(1) {
          grid-column: 1 / 3;
          span {
            display: inline-block;
            transform: translateY(-50px);
            animation: ${textApparitionAnim} 0.4s forwards;
            ${cascadeDelay(5, 0.7)}
          }
        }
        /* &:nth-child(2) {
          grid-column: 3 / 6;
          opacity: 0;
          animation: ${fadeIn} 0.4s 2s forwards;
        } */
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
  // const [animIsLoaded, setAnimIsLoaded] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAnimIsLoaded(true);
  //   }, 2400);
  //   return () => clearTimeout(timer);
  // }, []);

  const changeColors = (newBgColor, newFontColor) => {
    setBgColor(newBgColor);
    setFontColor(newFontColor);
    document.body.style.color = newFontColor;
  };

  return (
    <StyledContainer $bgColor={bgColor}>
      <header>
        <div className="grid animationMask">
          <a href="" className="logo">
            <CascadeLogo color={fontColor} />
          </a>
          <a href="/expertise">Savoir-faire</a>
          <a href="">À propos</a>
          <a href="">Contact</a>
        </div>
      </header>
      <section className="grid hero">
        <p>
          <span>Créateurs </span> <span>de&nbsp;</span>
          <span> sites </span> <span>web </span> <span>engageants.</span>
        </p>
      </section>
      <ProjectsSection projects={projects} changeColors={changeColors} />
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
