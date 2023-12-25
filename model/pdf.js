const mongoose = require("mongoose");
const pdfSchema = new mongoose.Schema(
  {
    pdf_name: {
      type: String,
    },
    pdf_url: {
      type: String,
    },
    pdf_asset_id: {
        type: String
    },
    standard: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Pdf", pdfSchema);
