import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled from "styled-components";
import { textApparitionAnim, cascadeDelay } from "@/styles/theme";

const StyledContainer = styled.div`
  section {
    &.hero {
      margin-top: 30px;
      align-items: start;
      p {
        overflow-y: hidden;
        &:nth-child(1) {
          grid-column: 1 / 3;
          position: sticky;
          top: 116px;
          span {
            display: inline-block;
            transform: translateY(-50px);
            animation: ${textApparitionAnim} 0.4s forwards;
            ${cascadeDelay(5, 0.7)}
          }
        }
        &:nth-child(2) {
          grid-column: 3 / 6;
          margin-bottom: 60px;
        }
      }
    }
  }
`;

export default function Home({ projects }) {
  return (
    <StyledContainer>
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
