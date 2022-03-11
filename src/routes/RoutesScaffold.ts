import fs from "fs";
import path from "path";

import * as MasterRoutes from "./partials/index";

// console.log(MasterRoutes.default);

const routes: any = [];
Object.keys(MasterRoutes.default).forEach((url, index1, array) => {
  const route: any = {};
  Object.keys(MasterRoutes.default[index1]).forEach((url, index, array) => {
    route[url] = [
      '  "' + url + '": {\n',
      "    get: (req: Request, res: Response) => {\n",
      "      // Code\n",
      "   },\n",
      "    post: (req: Request, res: Response) => {\n",
      "      // Code\n",
      "    },\n",
      "    },\n",
    ];
  });
  routes.push(route);
});

const publicScaffold = routes[0];
const userScaffold = routes[1];

// "' + url + '"
// " + request + "
const scaffold = ["const Routes = [\n"];

Object.keys(routes).forEach((url, index, array) => {
  const parentRoute = routes[url];
  scaffold.push("{");
  Object.keys(parentRoute).forEach((url, index, array) => {
    parentRoute[url].forEach((element: any) => {
      scaffold.push(element);
    });
  });
  scaffold.push("},");
});

scaffold.push("];\nexport default Routes;\n");

const file = fs.createWriteStream(path.resolve(__dirname, "./XXX.ts"));

file.on("error\n\n", function (err) {
  console.log("There's an error in writing the file.");
});
scaffold.forEach((url, index, array) => {
  file.write(url);
});
file.end();
