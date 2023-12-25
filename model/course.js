const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
    },
    course_description: {
      type: String,
    },
    course_video_url: {
      type: String,
    },
    course_asset_id: {
      type: String,
    },
    course_price: {
      type: Number,
    },
    course_discount: {
      type: Number,
    },
    standard: {
      type: String,
    },
    subject: {
      type: String,
    },
    medium: {
      type: String,
    },
    course_code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Course", courseSchema);
