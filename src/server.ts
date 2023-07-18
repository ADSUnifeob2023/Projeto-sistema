import "reflect-metadata";
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
import { engine } from "express-handlebars";
import { MyDataSource } from "./config/dataSource";
const RouterCategory = require("./routers/CategoryRouter");
const RouterUser = require("./routers/UserRouter");
const RouterProduct = require("./routers/ProductRouter");
const RouterSales = require("./routers/Sales");

MyDataSource.initialize();

const app = express();

// Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "index",
    helpers: {
      selected: function (option, value) {
        const options = option.hasOwnProperty("id") ? option.id : option;
        if (options === value) {
          return " selected";
        } else {
          return "";
        }
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views/");

// Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(cookieParser("secrectParse"));
app.use(
  session({
    secret: "secrectSession",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Middleware
app.use((request, response, next) => {
  response.locals.sucess_message = request.flash("sucess_message");
  response.locals.error_message = request.flash("error_message");
  next();
});

// Static Directory
app.use("/assets", express.static("assets"));

// Router
app.use("/category", RouterCategory);
app.use("/product", RouterProduct);
app.use("/user", RouterUser);
app.use("/sales", RouterSales);

app.listen(3310, () => console.log("Server is reunning"));
