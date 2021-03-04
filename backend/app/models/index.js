const dbConfig = require("../config/config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;


db.project = require("./project.model.js")(mongoose);
db.frontendtool = require("./frontendtool.model.js")(mongoose);
db.language = require("./language.model.js")(mongoose);
db.backendtool = require("./backendtool.model.js")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");
db.student = require("./student.model");
db.tool = require("./tool.model");
db.project_num = require("./project_num.model");
db.cohort_num = require("./cohort_num.model");
db.image = require("./image.model")

db.ROLES = ["student", "admin", "visitor"];

module.exports = db;
