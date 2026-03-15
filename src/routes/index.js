const express = require("express");

const router = express.Router();

// Import route modules
const authRoutes = require("./auth/auth.routes");
const eventRoutes = require("./event/event.routes");
const customerRoutes = require("./customer/customer.routes");

// Mount routes
router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/customer", customerRoutes);

module.exports = router;