/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    coverage: {
      include: [
        "src/components/utils/pascalToKebab.ts",
        "src/components/utils/slugify.ts",
        "src/component-docs/shared/blockDataUtils.ts",
        "src/component-docs/shared/caseUtils.ts",
        "src/component-docs/shared/componentPath.ts",
      ],
      provider: "v8",
      reporter: ["text", "json-summary", "lcov"],
      thresholds: { branches: 90, functions: 90, lines: 90, statements: 90 },
    },
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
  },
});
