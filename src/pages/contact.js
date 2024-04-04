import styled from "styled-components";
import Footer from "@/components/layout/footer";
import theme from "@/styles/theme";
const StyledContainer = styled.div``;

export default function Contact() {
  return (
    <Footer
      colors={{ bgColor: theme.color.blue, fontColor: theme.color.white }}
      noAnimation
    />
  );
}
