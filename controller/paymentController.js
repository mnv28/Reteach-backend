const Razorpay = require("razorpay");
const crypto = require("crypto");
const payment = require("../model/payment");

const getOrderId = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_JVqQWR4Ae2STfT",
      key_secret: "Bde2Gy2edqxKYD5pJl0cg0nW",
    });
    var options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "TXN" + Date.now(),
      notes: {
        key1: req.body.name,
        key2: req.body.email,
        key3: req.body.number,
        key4: req.body.address,
        key5: req.body.product,
        key6: req.body.profile_name,
      },
    };

    instance.orders.create(options, function (err, order) {
      if (order) {
        console.log(order);
        return res.send(order.id);
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const paymentCallBack = async (req, res) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_order_id } =
    req.body;
  console.log("callback", req.body);
  try {
    const string = `${razorpay_order_id}|${razorpay_payment_id}`;

    const generated_signature = crypto
      .createHmac("sha256", "Bde2Gy2edqxKYD5pJl0cg0nW")
      .update(string)
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      console.log("payment successfull");
      return res.redirect("https://edu.reteach.co.in/success");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const paymentCancel = async (req, res) => {
  try {
    return res.redirect("https://edu.reteach.co.in/failure");
  } catch (error) {
    console.log(error.message);
  }
};
const saveToDb = async (req, res) => {
  const { userID, standard } = req.body;
  try {
    const result = await payment.create({
      userID,
      standard,
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getOrderId,
  paymentCallBack,
  paymentCancel,
  saveToDb,
};
