const { notificationQueue } = require("../../queues/notification.queue");

const triggerEventUpdateNotification = async (eventName, users) => {

  await notificationQueue.add("eventUpdateNotification", {
    eventName,
    users
  });

};

module.exports = { triggerEventUpdateNotification };