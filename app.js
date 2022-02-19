require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); 
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require("./middleware");

// app.options("*", cors());
app.use(cors())
// app.use(middleware.CORS);
app.use(express.json());
app.use("/auth", controllers.userscontroller);
app.use("/orders", controllers.orderscontroller);
app.use("/clients", controllers.clientscontroller);
app.use(middleware.validateSession);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
