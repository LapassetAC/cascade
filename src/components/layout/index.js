import Header from "./header";
import Footer from "./footer";
import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "@/app/Context";

const StyledLayout = styled.div`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};
  transition: background-color 0.4s;
`;

export default function Layout({ children }) {
  const { colors } = useContext(Context);

  return (
    <StyledLayout $bgColor={colors.bgColor} $fontColor={colors.fontColor}>
      <Header bgColor={colors.bgColor} fontColor={colors.fontColor} />
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  );
}
