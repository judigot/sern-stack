import fs from "fs";
import path from "path";

const scaffold = [
  "const Routes = {\n",
  "  get: (req: Request, res: Response) => {\n",
  "    // Get\n",
  "  },\n",
  "  post: (req: Request, res: Response) => {\n",
  "    // Post\n",
  "  },\n",
  "};\n",
  "export default Routes;\n",
];
const file = fs.createWriteStream(path.resolve(__dirname, "./XXX.ts"));
file.on("error\n\n", function (err) {
  console.log("There's an error in writing the file.");
});
scaffold.forEach((url, index, array) => {
  file.write(url);
});
file.end();
