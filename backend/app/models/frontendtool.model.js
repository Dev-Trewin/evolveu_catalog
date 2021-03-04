const { Schema } = require("mongoose");
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        name:{
          type:String,
          required:true
        }
        }
      
      );
  
    
    const Frontendtool = mongoose.model("frontendtool", schema);
    return Frontendtool;
  };