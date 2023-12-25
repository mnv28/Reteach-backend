const router = require("express").Router();
const Enquiry = require("../model/enquiryForm");

//endoint to the register enquiry
router.post("/enquiry-user", async (req, res) => {
  try {
    console.log(req.body)
    let enquiry = await Enquiry.findOne({ email: req.body.email });
    if (enquiry) {
      return res
        .status(400)
        .json({
          message: "Sorry an enquiry with this email already exists"
        });
    }
    check_enquiry = await Enquiry.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      subject: req.body.subject
    });
    if (check_enquiry) {
      res
        .status(200)
        .json({message: "Your enquiry have been created" });
    }
  } catch (error) {
    res.status(400).send({message: error.message });
  }
});
//endpoint to the enquiries
router.get("/get-enquiry",async(req,res)=>{
    try {
    const enquiry = await Enquiry.find();
    res.status(200).send({enquiries: enquiry})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;
