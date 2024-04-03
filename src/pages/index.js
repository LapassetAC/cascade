import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled from "styled-components";
import { textApparitionAnim, fadeIn, cascadeDelay } from "@/styles/theme";

const StyledContainer = styled.div`
  section {
    &.hero {
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
      </section>
      <ProjectsSection projects={projects} />
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
