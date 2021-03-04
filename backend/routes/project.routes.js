module.exports = app => {
  const projects = require("../app/controllers/project.controller.js");
  const upload = require("../app/middleware/upload")
  var router = require("express").Router();

  // Create a new project
  router.post("/", upload.single('image'), projects.create);

  // Retrieve all projects
  // router.get("/", projects.findAll);

  // Filter with multiple paramater
  router.get("/"
    , projects.findmultipleparam);
  // : cohort ? /:projectnum?/ : name ? /:languages?/ : frontend ? /:backend?

  // Retrieve a single project with id
  router.get("/:id", projects.findOne);

  // Retrieve projects from a single owner id
  router.get("/userId/:id", projects.findProjectsFromUser);

  // Update a project with id
  router.put("/:id", projects.update);

  // Delete a project with id
  router.delete("/:id", projects.delete);

  // Delete all project
  // router.delete("/", projects.deleteAll);

  app.use("/api/project", router);
};
