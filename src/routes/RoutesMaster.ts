import publicRoutes from "./partials/_PublicRoutes";
import userRoutes from "./partials/_UserRoutes";

const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = userRoutes;
routes["globalChunks"] = ["global", "main"];

export default routes;
