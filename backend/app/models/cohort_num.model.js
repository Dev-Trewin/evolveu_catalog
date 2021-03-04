const mongoose = require("mongoose");

const Cohort_num = mongoose.model(
  "Cohort_num",
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
module.exports = Cohort_num;