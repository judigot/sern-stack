import webpack from "webpack";
import { buildType } from "./webpack.config";

const env = process.argv.slice(2)[0];

webpack(buildType(env), (error?: any, stats?: any) => {
  if (error || stats?.hasErrors()) {
    console.log(error || stats);
  }
  console.log("Done processing.");
});
