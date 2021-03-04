const db = require("../models");
const Image = db.image;
const fs = require('fs');
const path = require('path');
const Project = db.project;

// Create and Save a new Project
exports.create = async (req, res) => {
  // console.log('create project', req.body)
  let screenshotId = null;
  // Validate request
  if (!req.body.project_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (req.file) {//create the image********
    const obj = {
      name: req.body.name,
      img: {
        data: fs.readFileSync(path.join(__dirname + '/../../app/uploads/' + req.file.filename)),
        contentType: req.file.mimetype
      }
    }

    const image = await Image.create(obj)//get bakc image object from db
    screenshotId = image._id

  }/**********************************************************/
  console.log('screenshotId', screenshotId)
  // Create a Project
  const project = new Project({


    project_name: req.body.project_name,
    name_team_member: req.body.name_team_member,
    team_name: req.body.team_name,
    cohort_num: req.body.cohort_num,
    project_num: req.body.project_num,
    release_date: req.body.release_date,
    short_Description: req.body.short_Description,
    description: req.body.description,
    key_feature: req.body.key_feature,
    screenshotId: screenshotId,
    language: req.body.language,
    framework: req.body.framework,
    database: req.body.database,
    repository: req.body.repository,
    website_link: req.body.website,
    extra_tools: req.body.extra_tools,
    team_member_accounts: req.body.team_member_accounts,
    link_team_member_github_page: req.body.link_team_member_github_page,
    link_team_member_linked_page: req.body.link_team_member_linked_page,
    owner: req.body.owner

  });

  // Save project in the database
  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

exports.findmultipleparam = (req, res) => {

  const projectnum = req.query.projectnum
  const cohort = req.query.cohort
  const languages = req.query.languages
  const frontend = req.query.frontend
  const backend = req.query.backend
  const name = req.query.name

  var condition = {
    $or: [{ project_num: { $eq: req.query.projectnum } },
    { cohort_num: { $eq: req.query.cohort } },
    { language: { $in: req.query.languages } },
    { framework: { $in: req.query.frontend } },
    { database: { $in: req.query.backend } },
    { name_team_member: { $in: req.query.name } }]
  }

  if (!cohort && !projectnum && !languages && !frontend && !backend && !name) {
    condition = {}
  }

  Project.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving project."
      });
    });
}


// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  const project_name = req.query.project_name;
  var condition = project_name ? { project_name: { $regex: new RegExp(project_name), $options: "i" } } : {};

  Project.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving project."
      });
    });
};

// Find a single Project with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Project.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Project with id=" + id });
    });
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found!`
        });
      } else res.send({ message: "Project was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Project.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
        });
      } else {
        res.send({
          message: "Project was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id
      });
    });
};

// Delete all Project from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Project were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Projects."
      });
    });
};


//Find the projects for one specific User ID
exports.findProjectsFromUser = (req, res) => {
  Project.find({ owner: req.params.id })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving project."
      });
    });
}