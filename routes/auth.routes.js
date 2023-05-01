const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const isLoggedOut = require("../middlewares/isLoggedOut");

// Route for Signup
router.get("/signup", isLoggedOut, (req, res, next) => {
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
    res.redirect("/profile");
  } catch (err) {
    console.log("there was an error", err);
    res.redirect("/profile");
  }
});

//Route for Logout
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect("/login");
  });
});

//Route for Login
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      return res.render("auth/login", { error: "User not existent" });
    }

    const passwordsMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatch) {
      return res.render("auth/login", {
        error: "Sorry the password is incorrect!",
      });
    }

    req.session.user = {
      email: user.email,
      username: user.username,
    };

    console.log(req.body);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
