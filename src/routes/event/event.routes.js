const express = require("express");

const router = express.Router();

const EventController = require("../../controllers/event/event.controller");

// Create event
router.post("/", EventController.createEvent);

// Get all events
router.get("/", EventController.getEvents);

// Update event
router.put("/:id", EventController.updateEvent);

// Delete event
router.delete("/:id", EventController.deleteEvent);

module.exports = router;