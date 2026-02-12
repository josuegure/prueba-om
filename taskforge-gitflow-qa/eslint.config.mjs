import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  // Código Node (src)
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Tests Jest (test)
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
