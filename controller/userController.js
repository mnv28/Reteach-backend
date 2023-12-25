const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const validator = require("validator");

//create token structure
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
};

//login user
const loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await userModel.login(emailOrPhone, password);

    //create token
    const token = createToken(user._id);
    const _id = user._id;
    const name = user.name;
    const avatar = user.avatar;
    const role = user.role;
    const courses = user.courses;
    res
      .status(200)
      .json({ name, avatar, _id, emailOrPhone, token, role, courses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signUpUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    const user = await userModel.signup(name, email, password, mobile);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, mobile, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const studentList = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");
    res.status(200).send({ users: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const findUser = async (req, res) => {
  try {
    const { emailOrPhone } = req.params; // Assuming the email is passed as a parameter in the request

    // Check if email is provided
    if (!emailOrPhone) {
      return res.status(400).send("Email or Phone Number is required");
    }

    const isEmail = validator.isEmail(emailOrPhone);
    const query = isEmail ? { email: emailOrPhone } : { mobile: emailOrPhone };

    // Find the user by email or mobile
    const user = await userModel.findOne(query).select("-password");

    // if (!user) {
    //   throw Error("Incorrect Email or Mobile");
    // }

    // Check if the user with the specified email exists
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  loginUser,
  signUpUser,
  studentList,
  deleteUser,
  findUser,
};
