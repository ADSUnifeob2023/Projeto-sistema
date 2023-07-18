const express = require("express");
import { ProductController } from "../controllers/ProductController";

const routers = express.Router();

const Product = new ProductController();

/**
 * Create Product
 */
routers.get("/register", Product.createCategoryList.bind(Product));
routers.post("/register", Product.create.bind(Product));

/**
 * List Product
 */
routers.get("/list", Product.list.bind(Product));

/**
 * Update Product
 */
routers.get("/update/:id", Product.updateList.bind(Product));
routers.post("/update/:id", Product.update.bind(Product));

/**
 * Delete Product
 */

routers.get("/delete/:id", Product.delete.bind(Product));

module.exports = routers;
