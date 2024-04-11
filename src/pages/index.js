import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled, { css } from "styled-components";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";
import { useEffect } from "react";

const StyledContainer = styled.div`
  section {
    &.hero {
      margin-top: 15px;
      align-items: start;
      @media ${(props) => props.theme.minWidth.sm} {
        margin-top: 30px;
      }
      p {
        overflow-y: hidden;
        &:nth-child(1) {
          margin-bottom: 30px;
          @media ${(props) => props.theme.minWidth.sm} {
            margin-bottom: 0px;
            grid-column: 1 / 3;
            top: 116px;
            position: sticky;
            margin-bottom: 240px;
          }
          span {
            display: inline-block;
            ${cascadeDelay(5, 0.7)}
            ${({ $isFromPage }) =>
              !$isFromPage &&
              css`
                transform: translateY(-50px);
                animation: ${textApparitionAnim} 0.4s forwards;
              `}
          }
        }
        &:nth-child(2) {
          grid-column: 3 / 6;
          margin-bottom: 45px;
          animation: ${textApparitionAnim} 0.4s 2.3s forwards;
          opacity: 0;
          @media ${(props) => props.theme.minWidth.sm} {
            margin-bottom: 60px;
          }
        }
      }
    }
  }
`;

export default function Home({ projects, isFromPage }) {
  return (
    <StyledContainer $isFromPage={isFromPage}>
      <section className="grid hero">
        <p>
          <span>Créateurs </span> <span>de&nbsp;</span>
          <span> sites </span> <span>web </span> <span>engageants.</span>
        </p>
        <p>
          Nous concevons des sites web engageants pour des marques engagées. Nos
          créations se distinguent par leur fluidité, leur respect de
          l'environnement, et leur optimisation pour le référencement naturel
          (SEO).
        </p>
        <ProjectsSection projects={projects} />
      </section>
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
