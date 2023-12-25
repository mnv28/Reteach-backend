const router = require("express").Router();
const Class = require("../model/class");

//endpoint to add new Class
router.post("/register-class", async (req, res) => {
  try {
    const Newclass = await Class.create({
      className: req.body.className,
      classDiscountPrice: req.body.classDiscountPrice,
      classPrice: req.body.classPrice,
      class_englishMediumDiscountPrice:
        req.body.class_englishMediumDiscountPrice,
      class_englishMediumPrice: req.body.class_englishMediumPrice,
      class_hindiMediumDiscountPrice: req.body.class_hindiMediumDiscountPrice,
      class_hindiMediumPrice: req.body.class_hindiMediumPrice,
      isPurchased: req.body.isPurchased,
    });
    res.status(200).send({ success: true, data: Newclass });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//  endpoint to edit all class

router.post("/classes/:id", async (req, res) => {
  try {
    const data = await Class.findOne({ _id: req.params.id });
    console.log(data);
    await Class.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          className: req.body.className,
          classDiscountPrice: req.body.classDiscountPrice,
          classPrice: req.body.classPrice,
          class_englishMediumDiscountPrice:
            req.body.class_englishMediumDiscountPrice,
          class_englishMediumPrice: req.body.class_englishMediumPrice,
          class_hindiMediumDiscountPrice:
            req.body.class_hindiMediumDiscountPrice,
          class_hindiMediumPrice: req.body.class_hindiMediumPrice,
        },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Your class has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// endpoint to delete all classes

router.delete("/delete-class/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clsFound = await Class.findByIdAndDelete(id);
    if (!clsFound) {
      return res.status(400).json({ success: false, error: "Class not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// endpoint to get all classes

router.get("/classes-list", async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).send({ classes: classes });
    console.log(classes);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
