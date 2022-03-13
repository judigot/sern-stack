import fs from "fs";
import path from "path";

import * as MasterRoutes from "../config";

const fileNames: any = [];

fs.readdirSync(path.resolve(__dirname, `./partials/`)).filter((value) => {
  if (value !== "index.ts") {
    // Remove file extension
    const file = value.substring(0, value.length - 3);
    fileNames.push(`_${file}Routes`);
  }
});

const createScaffolding = (fileName: string, scaffold: any) => {
  // Write
  const file = fs.createWriteStream(
    path.resolve(__dirname, `./${fileName}.ts`)
  );
  file.on("error\n\n", function (err: any) {
    console.log("There's an error in writing the file.");
  });
  scaffold.forEach((url: any, index: any, array: any) => {
    file.write(url);
  });
  file.end();
};

const routes: any = [];

Object.keys(MasterRoutes.default).forEach((key, index) => {
  const route: any = {};
  Object.keys(MasterRoutes.default[index]).forEach((url) => {
    route[url] = [
      '  "' + url + '": {\n',

      // Route paths
      "    get: (req: Request, res: Response) => {\n",
      "      // Code\n",
      "    },\n",
      // "    post: (req: Request, res: Response) => {\n",
      // "      // Code\n",
      // "    },\n",
      // Route paths

      "  },\n",
    ];
  });
  routes.push(route);
});

// Loop through routes
Object.keys(routes).forEach((key, index) => {
  const route = routes[index];

  const scaffold = [
    'import { Request, Response, NextFunction } from "express";\n\n',
    "const Routes = {\n",
  ];

  // Loop through route paths
  Object.keys(route).forEach((path) => {
    route[path].forEach((routePath: any) => {
      scaffold.push(routePath);
    });
  });

  scaffold.push("};\n\n");

  scaffold.push("export default Routes;\n\n");

  scaffold.push("// Division - don't remove!\n");

  createScaffolding(fileNames[index], scaffold);
});
