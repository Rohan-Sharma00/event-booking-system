const express = require("express");
const router = express.Router();

const { UserAuth } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} = require("../../controllers/event/event.controller");

router.post("/", UserAuth, roleMiddleware("ADMIN"), createEvent);
router.get("/", UserAuth, roleMiddleware("ADMIN"), getEvents);
router.put("/:id", UserAuth, roleMiddleware("ADMIN"), updateEvent);
router.delete("/:id", UserAuth, roleMiddleware("ADMIN"), deleteEvent);

module.exports = router;