const db = require("../models");
const Account = db.account;
const { body, validationResult } = require('express-validator');
// Create and Save a new Account
exports.create = (req, res) => {

  // password must be at least 5 chars long
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Validate request
  //if (!req.body.name) {
   // res.status(400).send({ message: "Content can not be empty!" });
   // return;
  //}

  // Create a Account
  const account = new Account({
    name: req.body.name,
    last_name: req.body.last_name,
    email:req.body.email,
    password: req.body.password
  });

  // Save Account in the database
  account
    .save(account)
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

// Retrieve all Account from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
                  // if (name exists) {do this stuff}
  Account.find(condition)
    .then(data => {
      res.send(data);     // if all is wunderbar send the shice
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving account."
      });
    });
};

// Find a single Account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Account.findById(id)        // mongoDB function
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Account with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Account with id=" + id });
    });
};

// Update a Account by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Account with id=${id}. Maybe Account was not found!`
        });
      } else res.send({ message: "Account was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Account with id=" + id
      });
    });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Account.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Account with id=${id}. Maybe Account was not found!`
        });
      } else {
        res.send({
          message: "Account was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Account with id=" + id
      });
    });
};

// Delete all Account from the database.
exports.deleteAll = (req, res) => {
  Account.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Account were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accounts."
      });
    });
};
