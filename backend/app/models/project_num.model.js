const mongoose = require("mongoose");

const Project_num = mongoose.model(
  "Project_num",
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
module.exports = Project_num;