const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    titel: {
      type: String,
      require: [true, "blog titel is reqiured"],
    },
    description: {
      type: String,
      require: [true, "blog description is reqiured"],
    },
    image: {
      type: String,
      require: [true, "blog image is reqiured"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is require"],
    },
  },
  { timestamps: true }
);
const blogModal = mongoose.model("Blog", blogSchema);
module.exports = blogModal;
