import { defineConfig } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  timeout: 10000,
  use: {
    baseURL: process.env.BASE_URL,
  },
});
