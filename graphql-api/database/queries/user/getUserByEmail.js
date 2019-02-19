const UserModel = require("../../models/UserModel");

module.exports = email => {
  return UserModel.findOne({ email: email });
};
