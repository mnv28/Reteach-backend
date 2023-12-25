const router = require("express").Router();
const User = require("../model/user.js");
const bcrypt = require("bcryptjs");

// endpoint to get users

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users: users });
    console.log(users);
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

//endoint to the register user
router.post("/register-user", async (req, res) => {
  try {
    let check_user = await User.findOne({ email: req.body.email });
    if (check_user) {
      return res.status(400).json({
        success: false,
        message: "Sorry a user with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    check_user = await User.create({
      name: req.body.username,
      password: secPass,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role,
    });
    if (check_user) {
      res.status(200).json({
        success: true,
        message: "Your account have been created",
        data: check_user,
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});
//endpoint to the login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credentials",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success: false,
        error: "Please try to login with correct credentials",
      });
    }

    const finalData = { ...user.toJSON() };
    delete finalData["password"];
    delete finalData["mobile"];
    res.status(200).json(finalData);

    // res.status(200).send({success: true,userInfo: user})
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to the username
router.post("/change-username/:id", async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    await User.findByIdAndUpdate(
      { _id: data._id },
      { $set: { username: req.body.username } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your username has been updated",
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//endpoint to change password
router.post("/change-password", async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    // const user = await User.findOne(user => user.username === username);
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const isValidPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid old password" });
    }
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(newPassword, salt);
    const userData = await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { password: securePass } },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Your password has been updated",
    });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});
//endpoint to delete the user
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }
    res
      .status(200)
      .json({ success: false, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
});
// enpoint Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get("/getuser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.send({ data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//user to the picture
router.post("/Picture", async (req, res) => {
  try {
    if (!req?.files?.image)
      return res.status(400).send("Please upload an image");
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now}`,
      resource_type: "auto",
      folder: "profile",
    });
    if (result) {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
