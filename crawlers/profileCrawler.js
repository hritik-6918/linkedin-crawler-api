const axios = require("axios");
const cheerio = require("cheerio");
const Profile = require("../models/profile");

async function crawlProfiles(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": `Mozilla/5.0` },
    });
    const $ = cheerio.load(data);

    const profiles = [];
    $(".profile-listing-class").each((_, elem) => {
      profiles.push({
        name: $(elem).find(".name-class").text(),
        title: $(elem).find(".title-class").text(),
        skills: $(elem).find(".skills-class").text().split(","),
        location: $(elem).find(".location-class").text(),
        currentCompany: $(elem).find(".company-class").text(),
      });
    });

    await Profile.insertMany(profiles);
    console.log("Profiles crawled and stored.");
  } catch (error) {
    console.error("Error crawling profiles:", error);
  }
}

module.exports = crawlProfiles;
