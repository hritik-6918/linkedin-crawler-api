const express = require("express");
const mongoose = require("mongoose");
const profileRoutes = require("./routes/profiles");
const jobRoutes = require("./routes/jobs");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/linkedinCrawler", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/profiles", profileRoutes);
app.use("/jobs", jobRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
