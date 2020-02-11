const { Router } = require("express");
const checkTokenJWT = require("../security");

const routes = Router();
const TaskController = require("../controllers/TaskController");
const UserController = require("../controllers/UserController");

/** Rotas para notas */
routes.post("/task/add", checkTokenJWT, TaskController.createTask);
routes.delete("/task/remove", checkTokenJWT, TaskController.delete);
routes.get(
  "/task/listTasksByUser",
  checkTokenJWT,
  TaskController.listTasksByUser
);
routes.put("/task/edit", checkTokenJWT, TaskController.updateTask);

/** Rotas para usuário */
routes.post("/users/add", UserController.store);
routes.get("/users", UserController.index); // so para testes, retirar

/** Rotas para autenticação */
routes.post("/auth", UserController.login);

module.exports = routes;
