const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "username is requried"],
    },
    email: {
      type: String,
      require: [true, "email is requried"],
    },
    password: {
      type: String,
      require: [true, "password is requried"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);
const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;
