const mongoose = require("mongoose");
const ChatGroupModel = require("../../models/MessageModel");

module.exports = arryOfId => {
  // let arrOfMongooseId = arryOfId.map(id => new mongoose.Types.ObjectId(id));

  // return ChatGroupModel.find({
  //   _id: {
  //     $in: arrOfMongooseId
  //   }
  // });

  ChatGroupModel.findOne({ _id: groupId }).then(group => {
    group.messages.push(Message);
    group.save();
  });
};
