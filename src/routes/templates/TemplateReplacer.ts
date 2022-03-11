import fs from "fs";
import path from "path";

import * as MasterRoutes from "../config";

const template = String(
  fs.readFileSync(path.resolve(__dirname, `./Template.ts`))
);

const createScaffolding = (fileName: string, content: string) => {
  // Write
  fileName = path.resolve(__dirname, `./${fileName}.ts`);
  fs.writeFile(fileName, content, function (error) {
    if (error) return console.log(error);
  });
};

const fileNames: any = [];

fs.readdirSync(path.resolve(__dirname, `./partials/`)).filter((value) => {
  if (value !== "index.ts") {
    // Remove file extension
    const file = value.substring(0, value.length - 3);
    fileNames.push(`_${file}Routes`);
  }
});

Object.keys(MasterRoutes.default).forEach((url, index1, array) => {
  let fileContents: string = "";

  Object.keys(MasterRoutes.default[index1]).forEach((url, index, array) => {
    fileContents = `${template.replace(/\$/g, `"${url}"`)}`;
  });

  createScaffolding(fileNames[index1], fileContents);
});
