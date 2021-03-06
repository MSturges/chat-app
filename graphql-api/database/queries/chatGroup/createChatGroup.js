const ChatGroupModel = require("../../models/ChatGroupModel");
const UserModel = require("../../models/UserModel");

module.exports = ({ name, userIds }) => {
  // create new chat groupd with the specified name
  const chatGroup = new ChatGroupModel({ name });

  userIds.forEach(id => {
    UserModel.findOne({ _id: id }).then(user => {
      // add the groupChatId for each users chatGroups
      user.chatGroups.push(chatGroup.id);
      user.save();
    });
    // add the id of each user to the new chatGroup instance
    chatGroup.users.push(id);
  });

  return chatGroup.save();
};
