import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL ?? "mysql://root:nunna123@localhost:3306/omakka_cup",
  },
});