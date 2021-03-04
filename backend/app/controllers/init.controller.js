const db = require("../models")
const Student = db.student
const Tool = db.tool
const Project_num = db.project_num
const Cohort_num = db.cohort_num

exports.getStudent = (req, res) => {
    Student.find()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
}

exports.createStudent = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create backend tools
    const student = new Student({
        name: req.body.name

    });
    student
        .save(student)
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

exports.getTool = (req, res) => {
    Tool.find()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
}

exports.createTool = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create backend tools
    const tool = new Tool({
        name: req.body.name

    });
    tool
        .save(tool)
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

exports.getCohort = (req, res) => {
    Cohort_num.find()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
}

exports.createCohort = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create backend tools
    const cohort_num = new Cohort_num({
        name: req.body.name

    });
    cohort_num
        .save(cohort_num)
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

exports.getProjectNum = (req, res) => {
    Project_num.find()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
}

exports.createProjectNum = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create backend tools
    const project_num = new Project_num({
        name: req.body.name

    });
    project_num
        .save(project_num)
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