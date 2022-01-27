const db = require('../db');

const Users = require('./users');   // Users can have many clients with multiple orders
const Orders = require('./orders'); //You can't have an order without a client
const Clients = require('./clients');   //Clients can have multiple orders

// associations will go below
Users.hasMany(Clients, {
    onDelete: 'CASCADE',
});

Clients.hasMany(Orders);

Orders.belongsTo(Clients);


module.exports = {
    dbConnection: db,
    models: {
        Users,
        Clients,
        Orders
    }
};


