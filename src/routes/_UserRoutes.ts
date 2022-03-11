const routes: any = {
  "/user": {
    view: "home.ejs",
    chunks: [],
  },
  "/user/home": {
    view: "home.ejs",
    chunks: [],
  },
};

export const views: any = [];

Object.keys(routes).forEach((url, index, array) => {
  let { get: get, post: post, ...newValues } = routes[url];
  views[url] = newValues;
});

console.log(views);

export default routes;
