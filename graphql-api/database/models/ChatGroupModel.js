const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message"
    }
  ]
});

const ChatGroupModel = mongoose.model("chatGroup", ChatGroupSchema);

module.exports = ChatGroupModel;
