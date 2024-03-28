import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import CascadeLogo from "@/components/CascadeLogo";
import styled from "styled-components";
import { textApparitionAnim } from "@/styles/theme";

const StyledContainer = styled.div`
  header {
    align-items: end;
    padding: 0px;
    overflow-y: hidden;
    margin: 30px 30px 0;
    padding-bottom: 30px;
    a {
      transform: translateY(-50px);
      animation: ${textApparitionAnim} 0.4s forwards;
      &:nth-child(1) {
        grid-column: 1 / 3;
      }
      &:nth-child(2) {
        animation-delay: 0.1s;
      }
      &:nth-child(3) {
        animation-delay: 0.2s;
      }
      &:nth-child(4) {
        animation-delay: 0.3s;
      }
      &:nth-child(5) {
        animation-delay: 0.4s;
      }
    }
  }
  section {
    &.hero {
      p {
        &:nth-child(1) {
          grid-column: 1 / 3;
        }
        &:nth-child(2) {
          grid-column: 3 / 6;
        }
      }
    }
  }
`;

export default function Home({ projects }) {
  return (
    <StyledContainer>
      <header className="grid">
        <a href="">
          <CascadeLogo />
        </a>
        <a href="">Projets</a>
        <a href="">Savoir-faire</a>
        <a href="">À propos</a>
        <a href="">Contact</a>
      </header>
      <section className="grid hero">
        <p>Revitalisez votre présence digitale.</p>
        <p>
          Nous concevons des sites web engageants pour des marques engagées. Nos
          créations se distinguent par leur fluidité, leur respect de
          l'environnement, et leur optimisation pour le référencement naturel
          (SEO).
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
