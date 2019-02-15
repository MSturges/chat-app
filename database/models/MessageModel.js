const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // name: String,
  // rooms: [
  //   new Schema({
  //     roomName: String,
  //     available: Boolean,
  //     price: Number,
  //     beds: Number,
  //     baths: Number
  //   })
  // ],
  // reservations: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "reservation"
  //   }
  // ]
});

const MessageModel = mongoose.model("group", MessageSchema);

module.exports = MessageModel;
