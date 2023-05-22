const UserModel = require("../models/User.model");

const isAuthor = async (req, res, next) => {
    const activeUsersName = req.session.user.username;
    const author = await UserModel.findOne({ username: activeUsersName });
    if (author == activeUsersName) {
      next();
      return;
    }
  
    res.send('Sorry, you are not the author of this event thus you cannot edit or delete it.')
  };
  
  module.exports = isAuthor;