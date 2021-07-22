const path = require("path");
const glob = require("glob");
const webpack = require("webpack");

const jsDirectory = "js";
const cssDirectory = "css";
const sassDirectory = "sass";
const imagesDirectory = "images";
const fontsDirectory = "fonts";
const viewsDirectory = "views";

const entryFolder = "src";
const outputFolder = "dist";

const assetsFolderName = "public";

const assetFolderOutput = `${assetsFolderName}/`;
// const assetFolderOutput = ``;

//====================Plugins====================//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
//====================Plugins====================//

const buildMode = "production"; // production/development

const main = {
  mode: buildMode,

  entry: {
    // entry1: './src/js/entry1.js',
    // entry2: './src/js/entry2.js',

    // pageOne: './src/pageOne/index.js',
    // pageTwo: './src/pageTwo/index.js',
    // users: './src/users/index.js',

    app: [
      // `bootstrap/dist/css/bootstrap.min.css`,
      // `jquery/dist/jquery.js`,
      // `bootstrap/dist/js/bootstrap.min.js`,
      `./${entryFolder}/${jsDirectory}/main.js`,
      // `./${entryFolder}/${sassDirectory}/main.scss`,
    ],

    // , // Add vendors dependencies here
    // styles: [
    //     `bootstrap`
    // ]
  },

  output: {
    path: path.resolve(__dirname, `./${outputFolder}`),
    filename: `${assetFolderOutput}${jsDirectory}/[name].[chunkhash].js`, // Chunkhash for file versioning/long-term caching
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

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

      // Babel
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [["@babel/preset-env", { targets: "defaults" }]],
      //       plugins: ["@babel/plugin-proposal-class-properties"],
      //     },
      //   },
      // },

      // HTML/PAGES
      // {
      //     // test: /\.(html|php)$/,
      //     test: /\.html$/,
      //     use: [
      //         {
      //             loader: 'file-loader',
      //             options: {
      //                 name: `[name].[ext]`
      //             }
      //         }
      //     ],
      //     exclude: path.resolve(__dirname, `${entryDirectory}/index.html`)
      // },

      // SCSS
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { url: true },
          },
          "sass-loader",
        ],
        // It will take effect from right to left
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|bmp)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${assetFolderOutput}${imagesDirectory}/[name].[hash].[ext]`,
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: `${assetFolderOutput}${fontsDirectory}/[name].[ext]`,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // new CleanWebpackPlugin(),

    new webpack.LoaderOptionsPlugin({
      minimize: buildMode === "production" ? true : false,
    }),

    new MiniCssExtractPlugin({
      filename: `${assetFolderOutput}${cssDirectory}/[name].[chunkhash].css`, // Chunkhash for file versioning/long-term caching
    }),

    new CopyPlugin({
      patterns: [
        {
          from: `${entryFolder}/${viewsDirectory}`,
          to: `${viewsDirectory}`,
        },
      ],
      options: {
        concurrency: 100,
      },
    }),

    new HtmlWebpackPlugin({
      filename: `./${outputFolder}/${viewsDirectory}/index.ejs`, // Output file name
      template: `./${entryFolder}/${viewsDirectory}/index.ejs`,
      chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
    }),

    // new HtmlWebpackPlugin({
    //   filename: "index.html", // Output file name
    //   template: `./${entryFolder}/index.html`,
    //   chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
    // }),

    // new HtmlWebpackPlugin({
    //   filename: "users.html", // Output file name
    //   template: `./${entryFolder}/users.html`,
    //   chunks: ["app"], // Specify specific bundles in string (e.g. `app`, `main`, `index`)
    // }),

    // Removes too much. Causing bug on bootstrap modal backdrop
    // new PurgeCSSPlugin({
    //     paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
    // }),
  ],
};
module.exports = [main];
