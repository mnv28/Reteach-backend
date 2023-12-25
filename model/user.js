const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/manavdev/image/upload/v1703419525/course/user/yzjk9prjqj5and0nz2ow.png",
    },
    role: {
      type: String,
      default: "Student",
    },
    mobile: {
      type: String,
      required: true,
    },
    courses: [{ courseId: String }],
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//static signup method
//using this fuction require regular function
UserSchema.statics.signup = async function (name, email, password, mobile) {
  //validation
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }
  //email check
  const exists = await this.findOne({ email });
  const phoneExists = await this.findOne({ mobile });

  if (exists) {
    throw Error("Email already in use");
  }
  if (phoneExists) {
    throw Error("Phone Number already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash, mobile });

  return user;
};

//static login method

UserSchema.statics.login = async function (identifier, password) {
  //validation
  if (!identifier || !password) {
    throw Error("All fields must be filled");
  }

  // Check if the identifier is an email or a mobile number
  const isEmail = validator.isEmail(identifier);
  const query = isEmail ? { email: identifier } : { mobile: identifier };

  // Find the user by email or mobile
  const user = await this.findOne(query);

  if (!user) {
    throw Error("Incorrect Email or Mobile");
  }

  // Compare hash and user input password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
