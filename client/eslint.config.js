import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";

/** @type {import("eslint").Linter.Config} */
const config = {
  files: ["src/**/*.js", "src/**/*.jsx"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
  },
  plugins: {
    react,
    jest,
  },
  rules: {
    "no-unused-vars": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

export default config;

