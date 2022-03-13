import publicRoutes from "./_PublicMain";
import userRoutes from "./_UserMain";

const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = userRoutes;
routes["globalChunks"] = ["vendor"];

export default routes;
