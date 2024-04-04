import styled from "styled-components";

const StyledContainer = styled.div`
  min-height: ${({ theme }) => `calc(100vh - ${theme.headerHeight}px)`};
  padding: 90px 0 200px;
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  .intro {
    grid-column: 4 / 7;
    margin-bottom: 130px;
  }
  h2 {
    grid-column: 4 / 5;
    font-size: 32px;
    font-weight: 900;
  }
  ul {
    grid-column: 5 / 6;
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
      <h2>Identité</h2>
      <ul>
        <li>création de logo</li>
        <li>charte graphique</li>
        <li>rédaction de contenu</li>
      </ul>
      <h2>Produits</h2>
      <ul>
        <li>sites vitrines</li>
        <li>e-commerce</li>
        <li>blogs</li>
        <li>applications Web</li>
      </ul>
      <h2>Conception</h2>
      <ul>
        <li>arborescence</li>
        <li>maquettage</li>
        <li>prototypage</li>
      </ul>
      <h2>Code</h2>
      <ul>
        <li>référencement (SEO)</li>
        <li>gestion du contenu (CMS)</li>
        <li>hébergement</li>
        <li>mise en ligne</li>
      </ul>
    </StyledContainer>
  );
}
