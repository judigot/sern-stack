import publicRoutes from "./_public";
import userRoutes from "./_user";

const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = addBaseURL("/user", userRoutes);
routes["globalChunks"] = ["vendor"];

function addBaseURL(baseURL: string, rawRoutes: object) {
  const configuredRoutes = Object.fromEntries(
    Object.entries(rawRoutes).map(([key, value]) =>
      // Prepend base URL to route
      [`${baseURL}${key}`, value]
    )
  );
  return configuredRoutes;
}

export default routes;
