const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      maxlength: 500
    },

    date: {
      type: Date,
      required: [true, "Event date is required"]
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true
    },

    totalTickets: {
      type: Number,
      required: true,
      min: [1, "At least 1 ticket required"]
    },

    availableTickets: {
      type: Number,
      required: true,
      min: 0
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

eventSchema.pre("save", function () {

  if (this.availableTickets > this.totalTickets) {
    throw new Error("Available tickets cannot exceed total tickets");
  }

});

/*
|--------------------------------------------------------------------------
| Indexing
|--------------------------------------------------------------------------
*/

eventSchema.index({ organizerId: 1 });
eventSchema.index({ date: 1 });

const EventModel = mongoose.model("Event", eventSchema);

module.exports = { EventModel };