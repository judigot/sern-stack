// Extract paths from tsconfig.json and convert to aliases
const tsconfig = require("./tsconfig.json");
const paths = tsconfig.compilerOptions.paths;
let aliases = {};
for (let i = 0; i < Object.keys(paths).length; i++) {
  const key = Object.keys(paths)[i];

  // Remove / and * from the string
  const alias = key.replace(/\/\*/g, "");

  // Babel.config.js
  const pathToFolder = paths[key][0].replace(/\*/g, "").slice(0, -1);
  aliases[alias] = `./src/${pathToFolder}/`;
}

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"],
    },
  },
  plugins: [
    ["@babel/plugin-transform-runtime"], // Fixes "ReferenceError: regeneratorRuntime is not defined"
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: aliases,
      },
    ],
  ],
};
