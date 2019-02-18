const ChatGroupModel = require("../../models/ChatGroupModel");

module.exports = _id => {
  return ChatGroupModel.findOne({ _id: _id }).populate({
    path: "messages",
    populate: [
      {
        path: "to",
        model: "chatGroup"
      },
      {
        path: "from",
        model: "user"
      }
    ]
  });
};
