const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const isLoggedIn = require("../middlewares/isLoggedIn");
const UserModel = require("../models/User.model");

router.use("/", authRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  // const { userID } = req.session.user._id;
  const usersName = req.session.user.username;
  const currentUser = await UserModel.findOne({ username: usersName }).populate("eventsCreated");
  // const currentUser = await UserModel.findById(userID).populate("eventsCreated");
  // console.log(req.session.user);
  res.render("auth/profile", { user: req.session.user }); 
});
 
module.exports = router; 
