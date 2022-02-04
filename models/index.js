const db = require("../db");

const Users = require("./users"); // Users can have many clients with multiple orders
const Orders = require("./orders"); //You can't have an order without a client
const Clients = require("./clients"); //Clients can have multiple orders

// associations will go below
Users.hasMany(Clients, {
  onDelete: "CASCADE",
});
// Users.hasMany(Orders, {
//   onDelete: "CASCADE",
// });
Clients.belongsTo(Users, {
  onDelete: "CASCADE",
});
Clients.hasMany(Orders, {
  onDelete: "CASCADE",
});
Orders.belongsTo(Clients, {
  onDelete: "CASCADE",
});
// Orders.belongsTo(Users, {
//   onDelete: "CASCADE",
// });

module.exports = {
  dbConnection: db,
  models: {
    Users,
    Clients,
    Orders,
  },
};
