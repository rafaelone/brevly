import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    exclude: [
      "dist",
      "docker",
      "coverage",
      "node_modules"
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ["src/**/*.ts"],
      exclude: [
        "src/env.ts",
        "src/server.ts",
        "src/transform-swagger-schema.ts",
        "src/db/**/*.ts",
        "src/factories/**/*.ts",
        "src/routes/**/*.ts",
        "src/shared/**/*.ts"
      ]
    }
  }
})
