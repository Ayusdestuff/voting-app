const mongoose = require("mongoose");
const { Schema } = mongoose;
const optionsSchema = require("./Options");

const pollSchema = new Schema({
  _author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  options: [optionsSchema],
  respondees: [String]
});

module.exports = mongoose.model("Poll", pollSchema);
