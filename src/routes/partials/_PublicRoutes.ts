export default <any>{
  "/": {
    view: "index",
    chunks: ["vendor", "main"],
  },
  "/login": {
    view: "index.ejs",
    chunks: ["vendor", "login"],
  },
};
