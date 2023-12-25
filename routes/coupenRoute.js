const router = require("express").Router();
const Coupen = require("../model/coupenCode");

//endpoint to add new coupen
router.post("/add-coupen", async (req, res) => {
  try {
    const coupenCodeData = await Coupen.create({
      coupenCode: req.body.coupenCode,
      coupenAmountPercentage: req.body.coupenAmountPercentage,
    });
    res.status(200).send({ success: true, data: coupenCodeData });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//  endpoint to edit coupen

router.post("/coupen-code/:id", async (req, res) => {
  try {
    const data = await Coupen.findOne({ _id: req.params.id });
    console.log(data);
    await Coupen.findByIdAndUpdate(
      { _id: data._id },
      {
        $set: {
          coupenCode: req.body.coupenCode,
          coupenAmountPercentage: req.body.coupenAmountPercentage,
        },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Your Coupen has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// endpoint to delete coupen

router.delete("/delete-coupen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cpnFound = await Coupen.findByIdAndDelete(id);
    if (!cpnFound) {
      return res
        .status(400)
        .json({ success: false, error: "Coupen not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Coupen deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// endpoint to get all coupens

router.get("/coupens-list", async (req, res) => {
  try {
    const coupens = await Coupen.find({});
    res.status(200).send({ coupens: coupens });
    console.log(coupens);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
