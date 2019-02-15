const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatGroupSchema = new Schema({
  chatGroupName: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  messages: [
    new Schema({
      roomName: String,
      available: Boolean,
      price: Number,
      beds: Number,
      baths: Number
    })
  ]
});

const ChatGroupModel = mongoose.model("chatGroup", ChatGroupSchema);

module.exports = ChatGroupModel;
