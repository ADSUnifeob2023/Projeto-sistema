const express = require("express");
import { SalesController } from "../controllers/SalesController";

const routers = express.Router();

const Sales = new SalesController();

routers.get("/register", (request, response) => {
  response.render("salesRegister");
});

routers.post("/listProduct", Sales.ListComplete.bind(Sales));

routers.post("/listByOneProduct", Sales.ListByOneProduct.bind(Sales));

module.exports = routers;
