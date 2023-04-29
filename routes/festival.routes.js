const express = require("express");
const FestivalModel = require("../models/Festival.model");
const router = express.Router();

//route to list with all festivals
router.get("/festival/festival-list", async (req, res, next) => {
    try {
        const allFestivals = await FestivalModel.find();
        res.render("festival/festival-all", { allFestivals }); 
    } catch {
        res.send("Oops, an error, go back"); 
    }
  });

  //routes to create an event
  router.get("/festival/create", (req, res) => {
    res.render("festival/festival-create");
  });
  
  router.post("/festival/create", async (req, res) => {
    try {
      const newFestival = await FestivalModel.create(req.body);
      console.log("NEW FESTIVAL", newFestival);
      res.redirect("festival-list");
    } catch (err) {
      res.redirect("/festival/create");
      console.log("Error while trying to create an event", err);
    }
  });




module.exports = router;
