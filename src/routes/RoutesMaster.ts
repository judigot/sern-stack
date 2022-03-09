import publicRoutes from "./_PublicRoutes";
import userRoutes from "./_UserRoutes";

const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = userRoutes;
routes["globalChunks"] = ["global", "main"];

export default routes;
