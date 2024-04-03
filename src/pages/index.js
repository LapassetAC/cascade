import React, { useState, useEffect, useContext } from "react";
import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled from "styled-components";
import { textApparitionAnim, fadeIn, cascadeDelay } from "@/styles/theme";
import { ThemeContext } from "styled-components";

const StyledContainer = styled.div`
  background-color: ${(props) => props.$bgColor};
  transition: background-color 0.4s;
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
      <section className="grid hero">
        <p>
          <span>Créateurs </span> <span>de&nbsp;</span>
          <span> sites </span> <span>web </span> <span>engageants.</span>
        </p>
      </section>
      <ProjectsSection projects={projects} changeColors={changeColors} />
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
