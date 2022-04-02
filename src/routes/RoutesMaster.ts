import publicRoutes from "./_public";
import userRoutes from "./_user";
import express from "express";

const router = express.Router();

export const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = addBaseURL("/user", userRoutes);
routes["globalChunks"] = ["vendor"];

useRoute(routes.public);
useRoute(routes.user);

function useRoute(routes: any) {
  Object.keys(routes).forEach((url, index, array) => {
    const routeDetails = routes[url];
    if ("get" in routeDetails) {
      router.get(url, (req, res) => {
        routes[url].get(req, res);
      });
    }
    if ("post" in routeDetails) {
      router.post(url, (req, res) => {
        routes[url].post(req, res);
      });
    }
    if ("put" in routeDetails) {
    }
    if ("delete" in routeDetails) {
    }
    if ("patch" in routeDetails) {
    }
  });
}

function addBaseURL(baseURL: string, rawRoutes: object) {
  const routesWithBaseURL = Object.fromEntries(
    Object.entries(rawRoutes).map(([key, value]) =>
      // Prepend base URL to route
      [`${baseURL}${key}`, value]
    )
  );
  return routesWithBaseURL;
}

export default router;
