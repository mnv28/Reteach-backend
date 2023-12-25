const mongoose = require('mongoose')
const enquirySchema  = new mongoose.Schema({
firstName: {
    type: String
},
lastName: {
    type: String
},
email: {
    type: String
},
phoneNo: {
    type: String
},
subject: {
    type: String
}},{
    timestamps: true
});

module.exports = mongoose.model("Enquiry",enquirySchema);
