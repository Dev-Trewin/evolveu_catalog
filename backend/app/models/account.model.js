
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        name:{
          type:String,
          required:true
        },
        last_name:{
         type:String,
         required:true,

        },
        email:{
         type:String,
         required:true,
         unique:true
        },
        password:{
          type:String,
          required:true
        },
    
        }
      
      );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Account = mongoose.model("account", schema);
    return Account;
  };
  