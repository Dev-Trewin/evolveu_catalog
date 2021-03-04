const db = require("../models");
const Frontendtool = db.frontendtool;
const { body, validationResult } = require('express-validator');
// Create and Save a new Account
exports.create = (req, res) => {

  // password must be at least 5 chars long
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Validate request
  if (!req.body.name) {
   res.status(400).send({ message: "Content can not be empty!" });
   return;
  }

  // Create frontend tools
  const frontendtool = new Frontendtool({
    name: req.body.name,
    
  });

  // Save new tools to the Database
  frontendtool
    .save(frontendtool)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tool."
      });
    });
};

// Retrieve all tools from the database.
exports.findAll = (req, res) => {
  const frontendtools = req.query.frontendtools;
  var condition = frontendtools ? { frontendtools: { $regex: new RegExp(frontendtools), $options: "i" } } : {};
                  // if (name exists) {do this stuff}
  Frontend.find(condition)
    .then(data => {
      res.send(data);     // if all is wunderbar send the shice
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fontend tools."
      });
    });
};

// Find a single Language with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Frontend.findById(id)        // mongoDB function
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found frontend-tools with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving frontendtools with id=" + id });
    });
};

// Update a Frontend by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Frontend.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Frontend tools with id=${id}. Maybe tools was not found!`
        });
      } else res.send({ message: "Frotendtools was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Frontend with id=" + id
      });
    });
};

// Delete a Frontend tool with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Frontend.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Frontend with id=${id}. Maybe Frontend was not found!`
        });
      } else {
        res.send({
          message: "Language was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Language with id=" + id
      });
    });
};

// Delete all Language from the database.
exports.deleteAll = (req, res) => {
  Frontend.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Frontend were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all frontend tools."
      });
    });
};
