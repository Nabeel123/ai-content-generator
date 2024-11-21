import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-content-generator_owner:hRDi6qPsL0YV@ep-morning-pine-a5v3nwwy.us-east-2.aws.neon.tech/ai-content-generator?sslmode=require",
  },
});
