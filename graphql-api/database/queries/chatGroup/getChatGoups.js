const mongoose = require("mongoose");
const ChatGroupModel = require("../../models/ChatGroupModel");

module.exports = arryOfId => {
  let arrOfMongooseId = arryOfId.map(id => new mongoose.Types.ObjectId(id));

  return ChatGroupModel.find({
    _id: {
      $in: arrOfMongooseId
    }
  });
};
