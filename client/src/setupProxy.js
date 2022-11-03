const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://3.34.206.181:8080/",
      changeOrigin: true,
    })
  );
};
