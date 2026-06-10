import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // jsx-a11y "strict" catches accessibility problems at lint time,
  // before they ever reach a browser or a test run.
  jsxA11y.flatConfigs.strict,
  {
    ignores: [".next/**", "out/**", "coverage/**", "node_modules/**"],
  },
];

export default eslintConfig;
