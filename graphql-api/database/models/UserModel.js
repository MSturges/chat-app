const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function(email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"]
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  chatGroups: [
    {
      type: Schema.Types.ObjectId,
      ref: "chatGroup"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
