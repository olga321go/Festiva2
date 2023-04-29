const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");

// Route for Signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const salt = await bcryptjs.genSalt(12);
    console.log(salt);

    const hash = await bcryptjs.hash(req.body.password, salt);
    console.log(hash);

    await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      profilePhoto: req.body.profilePhoto,
      eventsCreated: req.body.eventsCreated,
    });

    //res.redirect("/profile");
  } catch (err) {
    console.log("there was an error", err);
    //res.redirect("/profile");
  }
});

module.exports = router;
