/**
 * 1. Set routes configuration here
 * 2. Scaffold routes (outputs: _PublicRoutes.ts)
 * 3. Configure route paths inside _PublicRoutes.ts
 */
export default <any>{
  "/": {
    view: "index",
    chunks: ["vendor", "main"],
  },
  "/login": {
    view: "index.ejs",
    chunks: ["vendor", "login"],
  },
  "/admin": {
    view: "admin.ejs",
    chunks: ["vendor", "login"],
  },
};
