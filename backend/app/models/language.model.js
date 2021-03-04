module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        languagename:{
          type:String,
          required:true
        }
        }
      
      );
  
    
    const Language = mongoose.model("language", schema);
    return Language;
  };
  