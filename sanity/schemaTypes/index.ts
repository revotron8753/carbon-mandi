import { type SchemaTypeDefinition } from "sanity";

// Objects
import { blockContent } from "./objects/blockContent";
import { seo } from "./objects/seo";

// Documents
import { siteSettings } from "./siteSettings";
import { article } from "./article";
import { project } from "./project";
import { teamMember } from "./teamMember";
import { partner } from "./partner";
import { product } from "./product";
import { csrPage } from "./csrPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // objects
    blockContent,
    seo,
    // documents
    siteSettings,
    article,
    project,
    teamMember,
    partner,
    product,
    csrPage,
  ],
};
