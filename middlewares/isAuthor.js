const FestivalModel = require("../models/Festival.model");
const UserModel = require("../models/User.model");

const isAuthor = async (req, res, next) => {
    const activeUsersName = req.session.user.username;
    const { festivalID } = req.params;
    const currentFestival = await FestivalModel.findById(festivalID);
    const authorID = currentFestival.author;
    const currentAuthor = await UserModel.findById(authorID);
    console.log("current author", currentAuthor);
    const currentAuthorUsername = currentAuthor.username;

    if (currentAuthorUsername === activeUsersName) {
      next();
      return;
    } else {
        res.send('Sorry, you are not the author of this event thus you cannot edit or delete it.');
    }
  
    
  };
  
  module.exports = isAuthor;