const ChatGroupModel = require("../../models/ChatGroupModel");

module.exports = _id => {
  return ChatGroupModel.findOne({ _id: _id }).populate({
    path: "messages",
    model: "message",
    options: {
      // skip: 2,
      // limit: 1,
      sort: { createdAt: -1 }
    },
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
