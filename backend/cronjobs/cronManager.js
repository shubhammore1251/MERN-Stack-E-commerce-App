const { CronJob } = require("cron");
const cronConfig = require("./cronConfig");

class CronManager {
  constructor() {
    this.jobs = [];
  }

  addJobsFromConfig() {
    cronConfig.forEach((config) => {
      const { schedule, job } = config;
      const cronJob = new CronJob(schedule, job, null, true, "Asia/Kolkata");
      this.jobs.push(cronJob);
    });
  }

  startJobs() {
    this.jobs.forEach((job) => job.start());
    console.log("running cron job");
  }
}

module.exports = CronManager;
