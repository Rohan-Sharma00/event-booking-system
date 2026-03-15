const mongoose = require("mongoose");

const { EventModel } = require("../../models/event.model");
const { BookingModel } = require("../../models/booking.model");
const { AppError } = require("../../utils/AppError");
const { convertResponseObj } = require("../../utils/UtilFunctions");

const { bookingEmailJob } = require("../../jobs/bookingEmail.job");

/*
|--------------------------------------------------------------------------
| GET EVENTS (CUSTOMER)
|--------------------------------------------------------------------------
| Fetch available events
*/

const getEvents = async (req, res, next) => {
  try {

    const events = await EventModel.find({
      availableTickets: { $gt: 0 }
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
| BOOK TICKET
|--------------------------------------------------------------------------
*/

const bookTicket = async (req, res, next) => {

  try {

    const customerId = req.user._id;

    const { eventId, tickets } = req.body;

    /*
    -------------------------------------------------
    Input Validation
    -------------------------------------------------
    */

    if (!eventId || !tickets) {
      throw new AppError("EventId and tickets are required", 400);
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new AppError("Invalid event id", 400);
    }

    if (tickets <= 0) {
      throw new AppError("Tickets must be greater than 0", 400);
    }

    /*
    -------------------------------------------------
    Atomic Ticket Booking
    Prevents overselling
    -------------------------------------------------
    */

    const event = await EventModel.findOneAndUpdate(
      {
        _id: eventId,
        availableTickets: { $gte: tickets }
      },
      {
        $inc: { availableTickets: -tickets }
      },
      { new: true }
    );

    if (!event) {
      throw new AppError("Not enough tickets available", 400);
    }

    /*
    -------------------------------------------------
    Create Booking
    -------------------------------------------------
    */

    const booking = await BookingModel.create({
      customerId,
      eventId,
      tickets
    });

    /*
    -------------------------------------------------
    Trigger Background Job
    -------------------------------------------------
    */

    bookingEmailJob({
      email: req.user.email,
      eventName: event.name,
      tickets
    });

    /*
    -------------------------------------------------
    Response
    -------------------------------------------------
    */

    res.status(201).send(
      convertResponseObj(
        booking,
        true,
        "Ticket booked successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| GET CUSTOMER BOOKINGS
|--------------------------------------------------------------------------
*/

const getBookings = async (req, res, next) => {

  try {

    const customerId = req.user._id;

    const bookings = await BookingModel.find({
      customerId
    })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.status(200).send(
      convertResponseObj(
        bookings,
        true,
        "Bookings fetched successfully"
      )
    );

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getEvents,
  bookTicket,
  getBookings
};