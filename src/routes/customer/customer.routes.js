const express = require("express");
const router = express.Router();

const { UserAuth } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

const {
  getEvents,
  bookTicket,
  getBookings
} = require("../../controllers/customer/customer.controller");

router.get("/events", UserAuth, roleMiddleware("CUSTOMER"), getEvents);
router.post("/book", UserAuth, roleMiddleware("CUSTOMER"), bookTicket);
router.get("/bookings", UserAuth, roleMiddleware("CUSTOMER"), getBookings);

module.exports = router;