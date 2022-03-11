// Public routes
import express from "express";
import Routes from "./RoutesMaster";
const router = express.Router();

useRoutes(Routes.public);

useRoutes(Routes.user);

function useRoutes(routes: any) {
  Object.keys(routes).forEach((url, index, array) => {
    const routeDetails = routes[url];
    if ("get" in routeDetails) {
      router.get(url, (req, res) => {
        routes[url].get(req, res);
      });
      // console.log(`GET route used in "${url}"`);
    }
    if ("post" in routeDetails) {
      router.post(url, (req, res) => {
        routes[url].post(req, res);
      });
      // console.log(`POST route used in route "${url}"`);
    }
    if ("put" in routeDetails) {
    }
    if ("delete" in routeDetails) {
    }
    if ("patch" in routeDetails) {
    }
  });
}

export default router;
