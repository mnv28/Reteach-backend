const passport = require('passport');
const nodemailer = require('nodemailer');

exports.isAuth = (req, res, done) => {
    return passport.authenticate('jwt');
  };

  exports.sanitizeUser = (user) => {
    return { id: user.id, role: user.role };
  };

  exports.cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  };

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'shahzaibmehmood65@gmail.com', // gmail
      pass: process.env.MAIL_PASSWORD, // pass
    },
  });