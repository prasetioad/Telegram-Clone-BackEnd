const jwt = require("jsonwebtoken");
const formResult = require("./formResult");
require("dotenv").config();

module.exports = {
  getToken: (value) => {
    try {
      const token = jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      return new Error(error).message;
    }
  },
  decodeToken: (req) => {
    try {
        // return req
      const decode = jwt.verify(req.id, process.env.SECRET_KEY);
      return decode;
    } catch (error) {
      return new Error(error).message;
    }
},
getTokenVerify: (value) => {
    try {
      const token = jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      return new Error(error).message;
    }
  },
  getToken: (value) => {
    try {
      const token = jwt.sign(value, process.env.SECRET_KEY, { expiresIn: "1d" });
      return token;
    } catch (error) {
      return formResult(res, 401, false, 'Token Expired!', error)
    }
  },
  verifyToken: (req) => {
    try {
      jwt.verify(req.headers["authorization"].split(" ")[1], process.env.SECRET_KEY);
      return true;
    } catch (error) {
      return new Error(error).message;
    }
  },
  decodeByHeader: (req) => {
    try {
        // return req
      const decode = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY);
      return decode;
    } catch (error) {
      return new Error(error).message;
    }
},
}