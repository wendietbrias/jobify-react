const routes = require("express").Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const {
  GetAllJob,
  CreateJob,
  DeleteJob,
  UpdateJob,
} = require("../controller/Jobs");

routes.get("/all", authMiddleware, GetAllJob);
routes.post("/add", authMiddleware, CreateJob);
routes.delete("/delete/:id", authMiddleware, DeleteJob);
routes.patch("/update/:id", authMiddleware, UpdateJob);

module.exports = routes;
