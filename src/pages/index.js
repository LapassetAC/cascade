import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import styled from "styled-components";

const StyledContainer = styled.div``;

export default function Home({ projects, isFromPage }) {
  return (
    <StyledContainer $isFromPage={isFromPage}>
      <ProjectsSection projects={projects} isFromPage={isFromPage} />
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
