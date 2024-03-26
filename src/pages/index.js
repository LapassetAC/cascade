import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled from "styled-components";

const StyledContainer = styled.div`
  header {
  }
`;

export default function Home({ projects }) {
  return (
    <StyledContainer>
      <header className="grid">
        <a href="">Cascade</a>
        <a href="">Projets</a>
        <a href="">Savoir-faire</a>
        <a href="">À propos</a>
        <a href="">Contact</a>
      </header>
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
