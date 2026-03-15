const mongoose = require("mongoose");

const { EventModel } = require("../../models/event.model");
const { BookingModel } = require("../../models/booking.model");

const { AppError } = require("../../utils/AppError");
const { convertResponseObj } = require("../../utils/UtilFunctions");

const { eventUpdateNotificationJob } = require("../../jobs/eventUpdateNotification.job");


/*
|--------------------------------------------------------------------------
| CREATE EVENT
|--------------------------------------------------------------------------
*/

const createEvent = async (req, res, next) => {
  try {

    const organizerId = req.user._id;

    const {
      name,
      description,
      date,
      location,
      totalTickets
    } = req.body;

    /*
    -------------------------------------------------
    Input Validation
    -------------------------------------------------
    */

    if (!name || !date || !location || !totalTickets) {
      throw new AppError("Required fields missing", 400);
    }

    if (totalTickets <= 0) {
      throw new AppError("Total tickets must be greater than 0", 400);
    }

    /*
    -------------------------------------------------
    Create Event
    -------------------------------------------------
    */

    const event = await EventModel.create({
      name,
      description,
      date,
      location,
      totalTickets,
      availableTickets: totalTickets,
      organizerId
    });

    res.status(201).send(
      convertResponseObj(event, true, "Event created successfully")
    );

  } catch (error) {
    next(error);
  }
};



/*
|--------------------------------------------------------------------------
| GET EVENTS (ORGANIZER)
|--------------------------------------------------------------------------
*/

const getEvents = async (req, res, next) => {
  try {

    const organizerId = req.user._id;

    const events = await EventModel.find({
      organizerId
    }).sort({ createdAt: -1 });

    res.status(200).send(
      convertResponseObj(events, true, "Events fetched successfully")
    );

  } catch (error) {
    next(error);
  }
};



/*
|--------------------------------------------------------------------------
| UPDATE EVENT
|--------------------------------------------------------------------------
*/

const updateEvent = async (req, res, next) => {

  try {

    const organizerId = req.user._id;
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new AppError("Invalid event id", 400);
    }

    const updateData = req.body;

    /*
    -------------------------------------------------
    Find Event
    -------------------------------------------------
    */

    const event = await EventModel.findOne({
      _id: eventId,
      organizerId
    });

    if (!event) {
      throw new AppError("Event not found or unauthorized", 404);
    }

    /*
    -------------------------------------------------
    Update Event
    -------------------------------------------------
    */

    Object.assign(event, updateData);

    const updatedEvent = await event.save();

    /*
    -------------------------------------------------
    Find users who booked this event
    -------------------------------------------------
    */

    const bookings = await BookingModel.find({
      eventId
    }).populate("customerId");

    const users = bookings.map(b => ({
      email: b.customerId.email
    }));

    /*
    -------------------------------------------------
    Trigger background notification job
    -------------------------------------------------
    */

    if (users.length > 0) {
      eventUpdateNotificationJob({
        eventName: updatedEvent.name,
        users
      });
    }

    res.status(200).send(
      convertResponseObj(
        updatedEvent,
        true,
        "Event updated successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};



/*
|--------------------------------------------------------------------------
| DELETE EVENT
|--------------------------------------------------------------------------
*/

const deleteEvent = async (req, res, next) => {

  try {

    const organizerId = req.user._id;
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new AppError("Invalid event id", 400);
    }

    const event = await EventModel.findOneAndDelete({
      _id: eventId,
      organizerId
    });

    if (!event) {
      throw new AppError("Event not found or unauthorized", 404);
    }

    res.status(200).send(
      convertResponseObj(
        {},
        true,
        "Event deleted successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};



module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent
};