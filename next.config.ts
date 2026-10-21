import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [85],
  },
  // Liens "Site par Cascade" des sites clients : /credit/<client>.
  // Pour envoyer un client vers une money page, ajouter une règle
  // spécifique avant la règle générique.
  async redirects() {
    return [
      {
        source: "/credit/:client",
        destination:
          "/?utm_source=:client&utm_medium=referral&utm_campaign=credit",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
