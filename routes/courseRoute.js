const router = require("express").Router();
const Course = require("../model/course");
const Pdf = require("../model/pdf");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

//endpoint to add new course
router.post("/register-course", async (req, res) => {
  try {
    if (!req?.files?.video)
      return res.status(400).send("Please upload an video");
    const file = req.files.video;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: file.name,
      resource_type: "video",
      folder: "course",
    });

    if (result) {
      const course = await Course.create({
        course_name: req.body.course_name,
        course_description: req.body.course_description,
        course_video_url: result.secure_url,
        course_asset_id: result.asset_id,
        course_price: req.body.course_price,
        standard: req.body.standard,
        subject: req.body.subject,
        medium: req.body.medium,
        course_discount: req.body.course_discount,
        course_code: req.body.course_code,
      });
      res.status(200).send({ success: true, data: course });
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//endpoint to change the course
router.get("/get-course/:standard", async (req, res) => {
  console.log(req.params.standard);
  try {
    const course = await Course.find({ standard: req.params.standard });
    res.status(200).send({ courses: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/courses", async (req, res) => {
  // console.log(req.params.standard)
  try {
    const courses = await Course.find({});
    res.status(200).send({ courses: courses });
    console.log(courses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/get-course", async (req, res) => {
  console.log(req.params.standard);
  try {
    const course = await Course.find();
    res.status(200).send({ courses: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//endpoint to get the course
router.get("/courseDetails/:id", async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id });
    res.status(200).send({ course_details: course });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//endpoint to the course name
router.post("/change-course-name/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id });
    console.log(data);
    await Course.findByIdAndUpdate(
      { _id: data._id },
      { $set: { course_name: req.body.course_name } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your course name has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to the course title
router.post("/change-course-title/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id });
    console.log(data);
    await Course.findByIdAndUpdate(
      { _id: data._id },
      { $set: { course_title: req.body.course_title } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your course title has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to change the description
router.post("/change-description/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id });
    console.log(data);
    await Course.findByIdAndUpdate(
      { _id: data._id },
      { $set: { course_description: req.body.course_description } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your course description has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to change the price
router.post("/change-price/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id });
    console.log(data);
    await Course.findByIdAndUpdate(
      { _id: data._id },
      { $set: { course_price: req.body.course_price } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your course price has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to change the discount
router.post("/change-discount/:id", async (req, res) => {
  try {
    const data = await Course.findOne({ _id: req.params.id });
    console.log(data);
    await Course.findByIdAndUpdate(
      { _id: data._id },
      { $set: { course_discount: req.body.course_discount } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your course discount has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post("/register-pdf", async (req, res) => {
  try {
    if (!req?.files?.pdf) return res.status(400).send("Please upload an pdf");
    const file = req.files.pdf;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "pdfs",
    });

    if (result) {
      const pdf = await Pdf.create({
        pdf_name: file.name,
        pdf_url: result.secure_url,
        pdf_asset_id: result.asset_id,
        standard: req.body.standard,
      });
      res.status(200).json({ pdfDetails: pdf });
    } else {
      res.status(500).json("Failed to upload PDF to Cloudinary");
    }

    // if (result) {

    //    res.status(200).send({success: true,data: course});
    // }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
