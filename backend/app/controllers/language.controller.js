const db = require("../models");
const Language = db.language;
const { body, validationResult } = require('express-validator');
// Create and Save a new Lenguage
exports.create = (req, res) => {

  // password must be at least 5 chars long
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Validate request
  if (!req.body.languagename) {
   res.status(400).send({ message: "Content can not be empty!" });
   return;
  }

  // Create a new Lenguage
  const language = new Language({
    languagename: req.body.languagename,
    
  });

  // Save new Language to the Database
  language
    .save(language)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the account."
      });
    });
};

// Retrieve all Language from the database.
exports.findAll = (req, res) => {
  const languagename = req.query.languagename;
  var condition = languagename ? { languagename: { $regex: new RegExp(languagename), $options: "i" } } : {};
                  // if (name exists) {do this stuff}
  Language.find(condition)
    .then(data => {
      res.send(data);     // if all is wunderbar send the shice
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving language."
      });
    });
};

// Find a single Language with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Language.findById(id)        // mongoDB function
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Language with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Language with id=" + id });
    });
};

// Update a Language by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Language.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Language with id=${id}. Maybe Language was not found!`
        });
      } else res.send({ message: "Language was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Language with id=" + id
      });
    });
};

// Delete a Language with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Language.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Language with id=${id}. Maybe Language was not found!`
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
  Language.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Language were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all language."
      });
    });
};
