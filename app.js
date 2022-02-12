require("dotenv").config();
var cors = require("cors"); 
const express = require("express");
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require("./middleware");

const app = express();
app.options("*", cors());
app.use(middleware.CORS);
app.use(express.json());
app.use("/auth", controllers.userscontroller);
app.use("/orders", controllers.orderscontroller);
app.use("/clients", controllers.clientscontroller);
app.use(middleware.validateSession);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  // .then(() => dbConnection.sync({force: true}))
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
