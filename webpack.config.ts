import webpack from "webpack";
import path from "path";
import dotenv from "dotenv";

import RoutesMaster from "./src/routes/RoutesMaster";

dotenv.config();

const isProduction = process.env.IS_PRODUCTION === "true" ? true : false;

const entryFolder = "src";
const outputFolder = "dist";

const jsDirectory = "js";
const cssDirectory = "css";
const sassDirectory = "sass";
const imagesDirectory = "images";
const fontsDirectory = "fonts";
const viewsDirectory = "views";
const templatingEngineExtension = "ejs";
// 
const assetsFolderName = "public";

//====================Plugins====================//
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin"); // Don't remove! This extracts paths from tsconfig.json and convert to aliases
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import HtmlWebpackPlugin from "html-webpack-plugin";
const CopyPlugin = require("copy-webpack-plugin");
import { CleanWebpackPlugin } from "clean-webpack-plugin";
//====================Plugins====================//

const chunkName = "vendor";

const build: any = {
  entry: {
    [chunkName]: [
      `jquery/dist/jquery.js`,
      `react`,
      `react-dom`,
      `bootstrap/dist/js/bootstrap.min.js`,

      // `./${entryFolder}/${jsDirectory}/main.js`, // Version 2
      // `./${entryFolder}/${sassDirectory}/main.scss`, // Version 2
    ],
    main: [
      `./${entryFolder}/${assetsFolderName}/${sassDirectory}/main.scss`, // Version 1
      `./${entryFolder}/${assetsFolderName}/${jsDirectory}/main.tsx`, // Version 1
    ],
    login: [
      `./${entryFolder}/${assetsFolderName}/${jsDirectory}/login.tsx`, // Version 1
    ],
  },

  output: {
    publicPath: `/`,
    path: path.resolve(__dirname, `./${entryFolder}/${assetsFolderName}`),
    filename: `[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 1
    // filename: `${jsDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 2

    // assetModuleFilename: "images/[hash][ext][query]",
    assetModuleFilename: "[hash][ext][query]",
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
    // alias: aliases, // Path aliases are extracted from tsconfig.json
    plugins: [new TsconfigPathsPlugin({})], // Don't remove! This extracts paths from tsconfig.json and convert to aliases
  },

  module: {
    rules: [
      // Babel: TypeScript/JavaScript (JSX, TSX, TS, and JS)
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      // SCSS
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // It will take effect from right to left
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        type: "asset", // Automatically chooses between exporting a data URI and emitting a separate file
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024, // 30kB
            // maxSize: 100 * 1024 , // 100kB
          },
        },
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 1
      // filename: `${cssDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 2
    }),
  ],
  // watch: true,
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    proxy: {
      "/": {
        target: "http://localhost:5000/",
      },
    },
  },
  mode: "development",
  target: "web",
};

const loadPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({
      _: "lodash",
    }),

    new CopyPlugin({
      // Version 2 - comment out favicon in HtmlWebpackPlugin, then add favicon statically in HTML pages (<link rel="icon" type="image/png" href="/favicon.png">)
      patterns: [
        // Copy partials folder
        {
          from: path.resolve(
            __dirname,
            `${entryFolder}/${viewsDirectory}/partials`
          ),
          to: path.resolve(
            __dirname,
            `${outputFolder}/${viewsDirectory}/partials`
          ),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ];
  // Add HtmlWebpackPlugin to plugins (dependent on RoutesMaster)
  const { globalChunks: globalChunks, ...Routes } = RoutesMaster;
  Object.keys(Routes).forEach((key) => {
    const route = Routes[key]; // public, user, global
    // Loop through route paths
    Object.keys(route).forEach((key) => {
      const viewLocation = route[key].view; // e.g.: index.ejs, login.ejs
      const chunks = route[key].chunks; // e.g.: ["vendor", "main"]
      const mergedChunks = [...RoutesMaster.globalChunks, ...chunks];

      plugins.push(
        new HtmlWebpackPlugin({
          favicon: `${entryFolder}/${assetsFolderName}/${imagesDirectory}/favicon.png`, // Version 1
          template: path.resolve(
            __dirname,
            `${entryFolder}/${viewsDirectory}/${viewLocation}.${templatingEngineExtension}`
          ), // Destination
          filename: path.resolve(
            __dirname,
            `${outputFolder}/${viewsDirectory}/${viewLocation}.${templatingEngineExtension}`
          ), // Destination
          chunks: mergedChunks, // Specify specific bundles in string (e.g. `app`, `main`, `index`)
        })
      );
    });
  });
  return plugins;
};

export default (env: any) => {
  const buildType = !env.buildType ? "production" : env.buildType;

  console.log(`Build type: ${buildType}`);

  if (buildType === "production") {
    delete build["watch"];
    build.output.path = path.resolve(
      __dirname,
      `./${outputFolder}/${assetsFolderName}`
    );
    build.module.rules.push({ test: /\.ejs$/, loader: "raw-loader" });
    build.plugins = [...build.plugins, ...loadPlugins()];
  }

  return build;
};
