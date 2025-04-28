import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use the ts-jest preset to handle TypeScript
  testEnvironment: "node", // Use Node.js environment for testing
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"], // Add TypeScript extensions
  globals: {},
  testMatch: ["**/__tests__/**/*.test.ts"], // Look for .test.ts files in __tests__ folder
};

export default config;
