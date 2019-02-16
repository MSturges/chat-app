const MessageModel = require("../../models/MessageModel");
const ChatGroupModel = require("../../models/ChatGroupModel");

module.exports = ({ message, userId, groupId }) => {
  // console.log("messageProps", messageProps);
  const Message = new MessageModel({ message });
  Message.to = groupId;
  Message.fromUser = userId;

  ChatGroupModel.findOne({ _id: groupId }).then(group => {
    group.messages.push(Message);
    group.save();
  });

  return Message.save();
};
