const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../models/job");

async function crawlJobs(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": `Mozilla/5.0` },
    });
    const $ = cheerio.load(data);

    const jobs = [];
    $(".job-listing-class").each((_, elem) => {
      jobs.push({
        jobTitle: $(elem).find(".job-title-class").text(),
        company: $(elem).find(".company-name-class").text(),
        location: $(elem).find(".job-location-class").text(),
        skillsRequired: $(elem).find(".skills-class").text().split(","),
        jobDescription: $(elem).find(".description-class").text(),
      });
    });

    await Job.insertMany(jobs);
    console.log("Jobs crawled and stored.");
  } catch (error) {
    console.error("Error crawling jobs:", error);
  }
}

module.exports = crawlJobs;
