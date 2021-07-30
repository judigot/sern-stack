const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const appFolder = "app";
const modelsFolder = "models";

const entryFolder = "src";
const outputFolder = "dist";

const jsDirectory = "js";
const cssDirectory = "css";
const sassDirectory = "sass";
const imagesDirectory = "images";
const fontsDirectory = "fonts";
const viewsDirectory = "views";
const templatingEngineExtension = "ejs";

const assetsFolderName = "public";

//====================Plugins====================//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
//====================Plugins====================//

const isProduction = false;

const chunkName = "main";

const production = {
  target: "node",
  entry: {
    [chunkName]: [
      `jquery/dist/jquery.js`,
      `bootstrap/dist/js/bootstrap.min.js`,

      `./${entryFolder}/${assetsFolderName}/${jsDirectory}/main.js`, // Version 1
      `./${entryFolder}/${assetsFolderName}/${sassDirectory}/main.scss`, // Version 1
      // `./${entryFolder}/${jsDirectory}/main.js`, // Version 2
      // `./${entryFolder}/${sassDirectory}/main.scss`, // Version 2
    ],

    index: [
      `./${entryFolder}/${assetsFolderName}/${jsDirectory}/index.js`,
      
    ]
  },

  output: {
    publicPath: `/`,
    path: path.resolve(__dirname, `./${outputFolder}/${assetsFolderName}`),
    filename: `[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 1
    // filename: `${jsDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 2
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      app: path.resolve(__dirname, `${entryFolder}/${appFolder}/`),
      models: path.resolve(__dirname, `${entryFolder}/${modelsFolder}/`),
    },
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      // Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },

      // EJS
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          variable: "data",
          esModule: false,
          interpolate: "\\{\\{(.+?)\\}\\}",
          evaluate: "\\[\\[(.+?)\\]\\]",
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
        loader: "file-loader",
        options: {
          name: `[name]${isProduction ? ".[hash]" : ""}.[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          // outputPath: `${imagesDirectory}`, // Version 2
          // publicPath: `../${imagesDirectory}`, // Path that is prepended to CSS files in dist (e.g. url(../${imagesDirectory}/[name].[ext]])) - Version 2
        },
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: `[name]${isProduction ? ".[hash]" : ""}.[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          // outputPath: `${fontsDirectory}`, // Version 2
          // publicPath: `../${fontsDirectory}`, // Path that is prepended to CSS files in dist (e.g. url(../${imagesDirectory}/[name].[ext]])) - Version 2
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: `${entryFolder}/${assetsFolderName}/${imagesDirectory}/favicon.png`, // Version 1
      template: path.resolve(
        __dirname,
        `${entryFolder}/${viewsDirectory}/index.${templatingEngineExtension}`
      ), // Destination
      filename: path.resolve(
        __dirname,
        `${outputFolder}/${viewsDirectory}/index.${templatingEngineExtension}`
      ), // Destination
      chunks: [chunkName], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
    }),

    new MiniCssExtractPlugin({
      filename: `[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 1
      // filename: `${cssDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 2
    }),

    // new CopyPlugin({ // Version 2 - comment out favicon in HtmlWebpackPlugin, then add favicon statically in HTML pages (<link rel="icon" type="image/png" href="/favicon.png">)
    //   patterns: [
    //     {
    //       from: `${entryFolder}/${assetsFolderName}/${imagesDirectory}`,
    //       to: `./`,
    //     },
    //   ],
    //   options: {
    //     concurrency: 100,
    //   },
    // }),
  ],
};

const development = {
  // target: "node",
  entry: {
    [chunkName]: [
      `jquery/dist/jquery.js`,
      `bootstrap/dist/js/bootstrap.min.js`,

      `./${entryFolder}/${assetsFolderName}/${jsDirectory}/main.js`, // Version 1
      `./${entryFolder}/${assetsFolderName}/${sassDirectory}/main.scss`, // Version 1
      // `./${entryFolder}/${jsDirectory}/main.js`, // Version 2
      // `./${entryFolder}/${sassDirectory}/main.scss`, // Version 2
    ],
  },

  output: {
    publicPath: `/`,
    path: path.resolve(__dirname, `./${entryFolder}/${assetsFolderName}`),
    filename: `[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 1
    // filename: `${jsDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.js`, // Chunkhash for file versioning/long-term caching - Version 2
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      app: path.resolve(__dirname, `${entryFolder}/${appFolder}/`),
      models: path.resolve(__dirname, `${entryFolder}/${modelsFolder}/`),
    },
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      // SCSS
      {
        test: /\.(css|sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // It will take effect from right to left
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        loader: "file-loader",
        options: {
          name: `[name]${isProduction ? ".[hash]" : ""}.[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          // outputPath: `${imagesDirectory}`, // Version 2
          // publicPath: `../${imagesDirectory}`, // Path that is prepended to CSS files in dist (e.g. url(../${imagesDirectory}/[name].[ext]])) - Version 2
        },
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: `[name]${isProduction ? ".[hash]" : ""}.[ext]`,
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
          // outputPath: `${fontsDirectory}`, // Version 2
          // publicPath: `../${fontsDirectory}`, // Path that is prepended to CSS files in dist (e.g. url(../${imagesDirectory}/[name].[ext]])) - Version 2
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 1
      // filename: `${cssDirectory}/[name]${isProduction ? ".[chunkhash]" : ""}.css`, // Chunkhash for file versioning/long-term caching - Version 2
    }),
  ],
};

// module.exports = (env) => {
//   return env.buildType;
// };

module.exports = (env) => {
  console.log(`Build type: ${env.buildType}`);
  return env.buildType === "production" ? production : development;
};
