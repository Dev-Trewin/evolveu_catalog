const mongoose = require("mongoose");

const Tool = mongoose.model(
  "Tool",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      }
    }
  )
)
module.exports = Tool;