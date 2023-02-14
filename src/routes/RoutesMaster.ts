import publicRoutes from "./_public";
import userRoutes from "./_user";
import express from "express";

export const routes: any = [];

routes["public"] = publicRoutes;
routes["user"] = addBaseURL("/user", userRoutes);
routes["globalChunks"] = ["vendor"];

export const PublicRouter = useRoute(routes.public);

export const PrivateRouter = useRoute(routes.user);

function useRoute(routes: any) {
  const router = express.Router();
  Object.keys(routes).forEach((url, index, array) => {
    const routeDetails = routes[url];
    if ("get" in routeDetails) {
      if (routes[url].middleware) {
        const middleware = routes[url].middleware;
        router.get(url, middleware, (req, res) => {
          routes[url].get(req, res);
        });
      } else {
        router.get(url, (req, res) => {
          routes[url].get(req, res);
        });
      }
      // router.get(url, (req, res) => {
      //   routes[url].get(req, res);
      // });
    }
    if ("post" in routeDetails) {
      if (routes[url].middleware) {
        const middleware = routes[url].middleware;
        router.post(url, middleware, (req, res) => {
          routes[url].post(req, res);
        });
      } else {
        router.post(url, (req, res) => {
          routes[url].post(req, res);
        });
      }
      // router.post(url, (req, res) => {
      //   routes[url].post(req, res);
      // });
    }
    if ("patch" in routeDetails) {
      if (routes[url].middleware) {
        const middleware = routes[url].middleware;
        router.patch(url, middleware, (req, res) => {
          routes[url].patch(req, res);
        });
      } else {
        router.patch(url, (req, res) => {
          routes[url].patch(req, res);
        });
      }
      // router.patch(url, (req, res) => {
      //   routes[url].patch(req, res);
      // });
    }
    if ("put" in routeDetails) {
      if (routes[url].middleware) {
        const middleware = routes[url].middleware;
        router.put(url, middleware, (req, res) => {
          routes[url].put(req, res);
        });
      } else {
        router.put(url, (req, res) => {
          routes[url].put(req, res);
        });
      }
      // router.put(url, (req, res) => {
      //   routes[url].put(req, res);
      // });
    }
    if ("delete" in routeDetails) {
      if (routes[url].middleware) {
        const middleware = routes[url].middleware;
        router.delete(url, middleware, (req, res) => {
          routes[url].delete(req, res);
        });
      } else {
        router.delete(url, (req, res) => {
          routes[url].delete(req, res);
        });
      }
      // router.delete(url, (req, res) => {
      //   routes[url].delete(req, res);
      // });
    }
  });
  return router;
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
