const { runBackgroundJob } = require("./runBackgroundJob");

const bookingEmailJob = async ({ email, eventName }) => {
  runBackgroundJob("BOOKING_EMAIL", async () => {
    console.log(
      `Booking confirmation email sent to ${email} for event ${eventName}`
    );
  });
};

module.exports = { bookingEmailJob };