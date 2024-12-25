const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  skills: [String],
  location: String,
  currentCompany: String,
});

module.exports = mongoose.model("Profile", profileSchema);
