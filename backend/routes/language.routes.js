module.exports = app => {
    const language = require("../app/controllers/language.controller.js");
  
    var router = require("express").Router();
  
    // Create a new project
    router.post("/", language.create);
  
    // Retrieve all projects
    router.get("/", language.findAll);
  
   
    // Retrieve a single project with id
    router.get("/:id", language.findOne);
  
    // Update a project with id
    router.put("/:id", language.update);
  
    // Delete a project with id
    router.delete("/:id", language.delete);
  
    // Delete all project
    router.delete("/", language.deleteAll);
  
    app.use("/api/language", router);
  };