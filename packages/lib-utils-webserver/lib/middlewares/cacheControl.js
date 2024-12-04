const cacheControl =
  ({ apiBasePath }) =>
  (req, res, next) => {
    if (req.url.startsWith(apiBasePath)) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // No caching for /bms URLs
    } else if (req.url.match(/\.(css|js|png|jpg|jpeg|gif)$/)) {
      res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year
    } else if (req.url === "/index.html") {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // No caching for index.html
    }
    next();
  };

export default cacheControl;
