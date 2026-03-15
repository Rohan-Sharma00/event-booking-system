const { Queue } = require("bullmq");
const { redisConnection } = require("../config/redis");

const notificationQueue = new Queue("notificationQueue", {
  connection: redisConnection
});

module.exports = { notificationQueue };