const jwt =require('jsonwebtoken')
const formResult = require('../helpers/formResult')
require('dotenv').config()

const Auth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
      const token = auth.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (!err) {
          if (decoded.role) req.body.role = decoded.role;
          next();
        } else {
          if (err.message === "jwt malformed") {
            formResult(res, 400, false, "Invalid Token", null);
          } else if (err.message === "jwt expired") {
            formResult(res, 400, false, "Token Expired", null);
          } else {
            formResult(res, 400, false, "Invalid Signature", null);
          }
        }
      });
    } else {
      formResult(res, 400, false, "Unauthorized", "Token Needed");
    }
  };


  module.exports = {
      Auth
  }