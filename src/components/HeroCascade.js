import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
`;
const StyledLine = styled.span`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => "calc(10vh + " + $height + "px)"};
  margin-right: ${({ $margin }) => $margin}px;
  background-color: black;
  display: inline-block;
  transition: all 1s;
`;

export default function HeroCascade() {
  const linesNb = 10;

  return (
    <StyledContainer>
      {Array.from({ length: linesNb }, (e, i) => {
        let w = i + 1;
        let h = 100 + Math.pow(i, 2.2);
        let m = linesNb - i;
        // console.log(Math.pow(h, 2));
        return (
          <StyledLine $width={w} $height={h} $margin={m} key={i}></StyledLine>
        );
      })}
    </StyledContainer>
  );
}
