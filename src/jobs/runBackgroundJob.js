const runBackgroundJob = (jobName, jobHandler) => {
  setImmediate(async () => {
    try {
      console.log(`\n[JOB STARTED] ${jobName}`);

      await jobHandler();

      console.log(`[JOB COMPLETED] ${jobName}\n`);
    } catch (error) {
      console.error(`[JOB FAILED] ${jobName}`, error.message);
    }
  });
};

module.exports = { runBackgroundJob };