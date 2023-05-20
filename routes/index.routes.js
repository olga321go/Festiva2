const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const isLoggedIn = require("../middlewares/isLoggedIn");
const UserModel = require("../models/User.model");
const FestivalModel = require("../models/Festival.model");
const bcryptjs = require("bcryptjs");
const fileUploader = require("../config/cloudinary.config");

router.use("/", authRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  // const { userID } = req.session.user._id;
  const sessionInfo = req.session;
  console.log("sessionInfo", sessionInfo);
  const usersName = req.session.user.username;
  const currentUser = await UserModel.findOne({ username: usersName }).populate(
    "eventsCreated"
  );
  const usersEvents = await FestivalModel.find();
  // const currentUser = await UserModel.findById(userID).populate("eventsCreated");
  // console.log(req.session.user);
  // const user = req.session.user;
  console.log("LOGGED USER", currentUser);
  res.render("auth/profile", { currentUser, usersEvents });
});

// Route for editing Profile
router.get("/profile/:profileId/edit", isLoggedIn, async (req, res) => {
  const { profileId } = req.params;
  const profileToEdit = await UserModel.findById(profileId);
  res.render("auth/profile-edit", { profileToEdit });
});

router.post("/profile/:profileId/edit", isLoggedIn, async (req, res) => {
  const { profileId } = req.params;
  /*const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: profileId },
    req.body
  );*/
  const salt = await bcryptjs.genSalt(12);
  console.log(salt);

  const hash = await bcryptjs.hash(req.body.password, salt);
  console.log(hash);

  await UserModel.findByIdAndUpdate(
    { _id: profileId },
    {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      //profilePhoto: req.file.path,
    }
  );

  res.redirect(`/profile`);
});

router.post("/profile/:profileId/delete", isLoggedIn, async (req, res) => {
  try {
    const { profileId } = req.params;
    await UserModel.findByIdAndDelete(profileId);
    res.redirect("/");
  } catch (err) {
    console.log("profile delete post error", err);
    res.send("Oops, problem while deleting, try again.");
  }
});

module.exports = router;
