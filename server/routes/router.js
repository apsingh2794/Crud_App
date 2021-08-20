const express = require("express");
const route = express.Router();
const Register = require("../model/model");

route.get("/", (req, res) => {
  res.render("index");
});

route.get("/add_user", (req, res) => {
  res.render("add_user");
});

route.get("/update-user", (req, res) => {
  res.render("update_user");
});

route.post("/add_user", async (req, res) => {
  try {
    const registerEmployee = new Register(req.body);
    const registerData = await registerEmployee.save();
    console.log(registerData);
    // res.status(200).render("index");
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
