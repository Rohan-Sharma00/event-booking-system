const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

const {
  getEvents,
  bookTicket,
  getBookings
} = require("../../controllers/customer/customer.controller");

router.get("/events", authMiddleware, roleMiddleware("CUSTOMER"), getEvents);
router.post("/book", authMiddleware, roleMiddleware("CUSTOMER"), bookTicket);
router.get("/bookings", authMiddleware, roleMiddleware("CUSTOMER"), getBookings);

module.exports = router;