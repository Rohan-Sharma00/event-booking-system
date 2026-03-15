const { notificationQueue } = require("../../queues/notification.queue");

const triggerBookingEmail = async (email, eventName) => {

  await notificationQueue.add("bookingEmail", {
    email,
    eventName
  });

};

module.exports = { triggerBookingEmail };