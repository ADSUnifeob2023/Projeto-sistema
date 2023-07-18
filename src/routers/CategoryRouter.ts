const express = require("express");
import { CategoryController } from "../controllers/CategoryController";

const routers = express.Router();

const Category = new CategoryController();

/**
 * Create Category
 */
routers.get("/register", (request, response) => {
  response.render("categoryRegister");
});
routers.post("/register", Category.create.bind(Category));

/**
 * List Category
 */
routers.get("/list", Category.list.bind(Category));

/**
 * Update Category
 */
routers.get("/update/:id", Category.listByOne.bind(Category));
routers.post("/update/:id", Category.update.bind(Category));

/**
 * Delete Category
 */
routers.get("/delete/:id", Category.delete.bind(Category));

module.exports = routers;
