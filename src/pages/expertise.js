import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: ${({ theme }) => `calc(100vh - ${theme.headerHeight}px)`};
  padding-top: 90px;
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  .intro {
    grid-column: 2 / 5;
  }
`;

export default function Expertise() {
  return (
    <StyledContainer className="grid">
      <p className="intro">
        Nous accompagnons nos clients à travers toutes les étapes de leur projet
        : de la conception du site jusqu’à sa mise en ligne. Afin de répondre
        précisément aux besoins et à l’autonomie de chaque client, nous
        privilégions une approche personnalisée en créant des designs de site
        uniques et en développant l’outils de gestion du contenu (CMS)
        sur-mesure.
      </p>
    </StyledContainer>
  );
}
