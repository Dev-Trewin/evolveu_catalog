module.exports = app => {
    const backendtool = require("../app/controllers/backendtool.controller.js");
  
    var router = require("express").Router();
  
    // Create a new backendtool
    router.post("/", backendtool.create);
  
    // Retrieve all backendtool
    router.get("/", backendtool.findAll);
  
   
    // Retrieve a single backendtool with id
    router.get("/:id", backendtool.findOne);
  
    // Update a backendtool with id
    router.put("/:id", backendtool.update);
  
    // Delete a backendtool with id
    router.delete("/:id", backendtool.delete);
  
    // Delete all backendtool
    router.delete("/", backendtool.deleteAll);
  
    app.use("/api/backendtool", router);
  };
  