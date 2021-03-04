const db = require("../models");
const Backendtool = db.backendtool;

// Create and Save a new Backendtool
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Backendtool
  const backendtool = new Backendtool({
   name:req.body.name
        
  });

  // Save Backend tool in the database
  backendtool
    .save(backendtool)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the backendtool."
      });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Backendtool.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving backend tool."
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Backendtool.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found backend tool with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving backend tool with id=" + id });
    });
};

// Update a Backendtool by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Backendtool.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Backend tool with id=${id}. Maybe backend tool was not found!`
        });
      } else res.send({ message: "backend tool was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating backend tool with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Backendtool.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete backend tool with id=${id}. Maybe backend tool was not found!`
        });
      } else {
        res.send({
          message: "backend tool was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete backend tool with id=" + id
      });
    });
};

// Delete all  backend tool from the database.
exports.deleteAll = (req, res) => {
  Backendtool.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} backend tool were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all backend tool."
      });
    });
};


