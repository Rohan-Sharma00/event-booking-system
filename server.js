// server.js

// Load environment first
require("dotenv").config({
  path: `.env.${process.env.ENV_NAME || "development"}`
});

// Import app
require("./src/app");