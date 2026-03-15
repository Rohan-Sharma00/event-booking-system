const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");

const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
} = require("../../controllers/event/event.controller");