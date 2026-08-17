import { createFileRoute } from "@tanstack/react-router";
import SiteApp from "../SiteApp";

const title = "Ocean Crown Shipping Services L.L.C | International Freight Forwarding";
const description =
  "Ocean Crown Shipping Services LLC — International freight forwarding by sea, air and land. Dubai, Amman, Basra, Antwerp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Ocean Crown Shipping Services L.L.C" },
      {
        property: "og:description",
        content: "Ships Anything Around The World — International Freight & Logistics",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SiteApp,
});
