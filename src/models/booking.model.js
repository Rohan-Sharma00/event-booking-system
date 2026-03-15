const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "At least 1 ticket must be booked"]
    }
  },
  { timestamps: true }
);

/*
|--------------------------------------------------------------------------
| Prevent duplicate booking entries
|--------------------------------------------------------------------------
*/

bookingSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true, background: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = { BookingModel };