const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const isLoggedIn = require("../middlewares/isLoggedIn");
const UserModel = require("../models/User.model");
const FestivalModel = require("../models/Festival.model");

router.use("/", authRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  // const { userID } = req.session.user._id;
  const usersName = req.session.user.username;
  const currentUser = await UserModel.findOne({ username: usersName }).populate("eventsCreated");
  const usersEvents = await FestivalModel.find();
  // const currentUser = await UserModel.findById(userID).populate("eventsCreated");
  // console.log(req.session.user);
  // const user = req.session.user;
  console.log("LOGGED USER", currentUser);
  res.render("auth/profile", { currentUser, usersEvents }); 
});
 
module.exports = router; 
