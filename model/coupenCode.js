const mongoose = require("mongoose");

const coupenCode = new mongoose.Schema(
  {
    coupenCode: {
      type: String,
    },
    coupenAmountPercentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("coupenCode", coupenCode);
