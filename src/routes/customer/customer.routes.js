const express = require("express");

const router = express.Router();

const CustomerController = require("../../controllers/customer/customer.controller");

// Browse events
router.get("/events", CustomerController.getEvents);

// Book ticket
router.post("/book", CustomerController.bookTicket);

// Customer bookings
router.get("/bookings", CustomerController.getBookings);

module.exports = router;