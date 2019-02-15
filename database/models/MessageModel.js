const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "chatGroup"
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  message: String,
  createdAt: Date
});

const MessageModel = mongoose.model("group", MessageSchema);

module.exports = MessageModel;
