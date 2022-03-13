// Public routes
import express from "express";
import Routes from "./RoutesMaster";
const router = express.Router();

useRoute(Routes.public);

useRoute(Routes.user);

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

export default router;
