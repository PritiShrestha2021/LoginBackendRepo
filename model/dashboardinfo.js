const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  imagepath: {
    type: String,
    required: false
  },
  //works like foreign key
  //used for linking databases coleection
  //ref: takes in the collection name
  //type: takes in the type of user which is an objectID
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userinfo"
  }
});

module.exports = mongoose.model("dashboardinfo", DashboardSchema);
