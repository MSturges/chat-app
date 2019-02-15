const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  userName: String,
  password: String,
  chatGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "chatGroup"
    }
  ]
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
