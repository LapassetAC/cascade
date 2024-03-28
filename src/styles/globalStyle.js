import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  /* overflow-x: hidden; */
  letter-spacing: -0.05em;
  transition: background-color 0.5s ease;
  background-color: #F4F3EF;
}

a,p,button,h1,h2,h3,i,input {
  letter-spacing: -0.05em;
  font-size: 24px;
 
}

a {
  color: inherit;
  text-decoration: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  padding: 15px;
  @media ${(props) => props.theme.minWidth.sm} {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 30px;
    padding: 30px;
  }
}
`;
