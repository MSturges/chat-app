const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");

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
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.plugin(mongoosePaginate);

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = MessageModel;
