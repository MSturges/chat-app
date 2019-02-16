const UserModel = require("../../models/UserModel");

module.exports = _id => {
  return UserModel.findOne({ _id: _id });
};
