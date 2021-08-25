const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    phoneno: {
      type: Number,
      required: false
    },
    password: {
      type: String,
      required: false
    }
    // signupdate: {
    //   type: Date,
    //   required: false
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userinfo", UserSchema);
