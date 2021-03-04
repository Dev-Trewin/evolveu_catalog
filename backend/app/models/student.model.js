const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
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
module.exports = Student;