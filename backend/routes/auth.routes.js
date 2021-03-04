const { verifySignUp } = require("../app/middleware");
const controller = require("../app/controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
     // verifySignUp.checkUsername_password
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
