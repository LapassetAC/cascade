import { client } from "../../sanity/lib/client";
import { PROJECTS_QUERY } from "../../sanity/lib/queries";
import ProjectsSection from "@/components/ProjectsSection";
import CascadeLogo from "@/components/CascadeLogo";
import styled from "styled-components";
import { textApparitionAnim, fadeIn } from "@/styles/theme";

const StyledContainer = styled.div`
  header {
    align-items: end;
    overflow-y: hidden;
    margin: 30px;
    padding: 0;
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
