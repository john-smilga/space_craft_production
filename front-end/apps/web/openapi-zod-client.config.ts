import { defineConfig } from "openapi-zod-client";

export default defineConfig({
  strict: true,
  withAlias: true,
  withPassthrough: false,
});
