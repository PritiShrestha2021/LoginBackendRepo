const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    imagepath: {
      type: "String",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("imageinfos", ImageSchema);
