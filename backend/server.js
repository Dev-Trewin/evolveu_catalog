const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};


app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to evolveu application." });
});

require("./routes/project.routes")(app);
require("./routes/language.routes")(app)
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/backendtool.routes")(app);
require("./routes/frontendtool.routes")(app);
require("./routes/init.routes")(app);
require("./routes/image.routes")(app)


// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'student' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "visitor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'visitor' to roles collection");
      });
    }
  });
}
