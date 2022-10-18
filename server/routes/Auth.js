const routes = require("express").Router();
const {
  SignInHandler,
  SignUpHandler,
  UpdateProfile,
} = require("../controller/Auth");

routes.post("/signin", SignInHandler);
routes.post("/signup", SignUpHandler);
routes.patch("/update/:id", UpdateProfile);

module.exports = routes;
