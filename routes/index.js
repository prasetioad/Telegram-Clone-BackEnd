const express = require("express");
const user = require('./user');
const msg = require('./msg');
const Route = express.Router();

Route.use("/users", user)
Route.use("/msg", msg)


module.exports = Route;
