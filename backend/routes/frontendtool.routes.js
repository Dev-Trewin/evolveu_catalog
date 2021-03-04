module.exports = app => {
    const frontendtool = require("../app/controllers/frontendtool.controller.js");
  
    var router = require("express").Router();
  
    // Create a new frontend tool
    router.post("/", frontendtool.create);
  
    // Retrieve all frontend tool
    router.get("/", frontendtool.findAll);
  
   
    // Retrieve a single frontend tool with id
    router.get("/:id", frontendtool.findOne);
  
    // Update a frontend tool with id
    router.put("/:id", frontendtool.update);
  
    // Delete a frontend tool with id
    router.delete("/:id", frontendtool.delete);
  
    // Delete all frontend tool
    router.delete("/", frontendtool.deleteAll);
  
    app.use("/api/frontendtool", router);
  };
  