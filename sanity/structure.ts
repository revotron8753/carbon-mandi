import type { StructureResolver } from "sanity/structure";
import { Cog, Leaf, Newspaper, Factory, User, Package, Handshake } from "lucide-react";

// Singleton documents (only one instance each).
const SINGLETONS = ["siteSettings", "csrPage"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(Cog)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("Right to Climate (CSR)")
        .icon(Leaf)
        .child(S.document().schemaType("csrPage").documentId("csrPage")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects").icon(Factory),
      S.documentTypeListItem("teamMember").title("Team").icon(User),
      S.documentTypeListItem("partner").title("Partners").icon(Handshake),
      S.documentTypeListItem("product").title("Products (Mandi)").icon(Package),
      S.documentTypeListItem("article").title("Articles").icon(Newspaper),
      S.divider(),
      // Any other types not explicitly listed above.
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "siteSettings",
            "csrPage",
            "project",
            "teamMember",
            "partner",
            "product",
            "article",
          ].includes(item.getId() ?? "")
      ),
    ]);

export { SINGLETONS };
