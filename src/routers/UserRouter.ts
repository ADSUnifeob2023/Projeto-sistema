const express = require("express");
import { UserController } from "../controllers/UserController";

const routers = express.Router();

const User = new UserController();

/**
 * Create User
 */
routers.get("/register", (request, response) => {
  response.render("userRegister");
});
routers.post("/register", User.create.bind(User));

/**
 * List User
 */
routers.get("/list", User.list.bind(User));

/**
 * Update User
 */
routers.get("/update/:id", User.listByOne.bind(User));
routers.post("/update/:id", User.update.bind(User));

/**
 * Delete Category
 */
routers.get("/delete/:id", User.delete.bind(User));

module.exports = routers;
