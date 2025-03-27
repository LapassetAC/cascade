import { Metadata } from "next";
import MentionsLegalesClient from "./MentionsLegalesClient";
export const metadata: Metadata = {
  title: "Mentions Légales - Studio Cascade",
  description: "Mentions légales du site Studio Cascade",
};

export default function MentionsLegales() {
  return <MentionsLegalesClient />;
}
