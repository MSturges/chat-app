const UserModel = require("../../models/UserModel");

module.exports = userProps => {
  const user = new UserModel(userProps);
  return user.save();
};
