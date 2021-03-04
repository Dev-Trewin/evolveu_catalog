const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String
    }

  );

  const Backendtool = mongoose.model("backendtool", schema);
  return Backendtool;
};