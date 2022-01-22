const db = require('../db');

const UsersModel = require ('./users'); 
const OrdersModel = require ('./orders');
const ClientsModel = require ('./clients');

// Users can have many clients with multiple orders
// UsersModel.hasMany(ClientsModel, {
//     onDelete: 'CASCADE',
// }); 
UsersModel.hasMany(ClientsModel);
// ClientsModel.hasMany(OrdersModel); //Clients can have multiple orders
// OrdersModel.belongsTo(ClientsModel); //You can't have an order without a client


module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        // OrdersModel,
        // ClientsModel
    }
};


