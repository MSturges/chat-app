const mongoose = require("mongoose");
const UserModel = require("../../models/UserModel");

module.exports = arryOfId => {
  let arrOfMongooseId = arryOfId.map(id => new mongoose.Types.ObjectId(id));

  return UserModel.find({
    _id: {
      $in: arrOfMongooseId
    }
  });
};
