const ChatGroupModel = require("../../models/ChatGroupModel");

module.exports = _id => {
  return ChatGroupModel.findOne({ _id: _id });
};
