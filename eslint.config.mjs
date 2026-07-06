import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "exports/**",
      "out/**",
      "out 2/**",
      "test-results/**",
      "tmp/**",
    ],
  },
  ...nextVitals,
  ...nextTs,
];

export default eslintConfig;
