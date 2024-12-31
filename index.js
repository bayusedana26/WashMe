require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const configureMiddleware = require("./config/middleware");
const configureRoutes = require("./config/routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Configure all middleware
configureMiddleware(app);

// Configure all routes
configureRoutes(app);

// Error handling middleware (should be last)
app.use(errorHandler);

// Import associations
require("./utils/associations");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

module.exports = app;
