const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
    },
    classDiscountPrice: {
      type: Number,
    },
    classPrice: {
      type: Number,
    },
    class_englishMediumDiscountPrice: {
      type: Number,
    },
    class_englishMediumPrice: {
      type: Number,
    },
    class_hindiMediumDiscountPrice: {
      type: Number,
    },
    class_hindiMediumPrice: {
      type: Number,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
