const ChatGroupModel = require("../../models/ChatGroupModel");
const UserModel = require("../../models/UserModel");

module.exports = ({ name, userIds }) => {
  // create new chat groupd with the specified name
  const chatGroup = new ChatGroupModel({ name });

  userIds.forEach(id => {
    UserModel.findOne({ _id: userIds }).then(user => {
      // add the chat id to user chatGroups
      user.chatGroups.push(chatGroup.id);
      // add user id to chatGroup users
      chatGroup.users.push(id);

      user.save();
    });
  });

  return chatGroup.save();
};
