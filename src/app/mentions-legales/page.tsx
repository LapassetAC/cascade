import { Metadata } from "next";
import ClientMentionsLegales from "./ClientMentionsLegales";
export const metadata: Metadata = {
  title: "Mentions Légales - Studio Cascade",
  description: "Mentions légales du site Studio Cascade",
};

export default function MentionsLegales() {
  return <ClientMentionsLegales />;
}
