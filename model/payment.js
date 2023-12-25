const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
     userID:  String,
     standard: {
         type:String
     }
},
{
    timestamps: true
  });

  module.exports = mongoose.model("Payment", paymentSchema);