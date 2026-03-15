const { runBackgroundJob } = require("./runBackgroundJob");

const eventUpdateNotificationJob = async ({ eventName, users }) => {
  runBackgroundJob("EVENT_UPDATE_NOTIFICATION", async () => {
    users.forEach((user) => {
      console.log(
        `Notification sent to ${user.email} for event update: ${eventName}`
      );
    });
  });
};

module.exports = { eventUpdateNotificationJob };