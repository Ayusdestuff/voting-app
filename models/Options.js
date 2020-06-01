const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionsSchema = {
  option: {
    type: String,
    trim: true
  },
  votesCount: {
    type: Number,
    default: 0
  }
}

module.exports = optionsSchema;