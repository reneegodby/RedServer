const { DataTypes } = require("sequelize");
const db = require("../db");

const Orders = db.define("orders", {
  orderId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  
  typeOfOrder: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.STRING,
    required: true, 
  },
  price: {
    type: DataTypes.INTEGER,
    required: true, 
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Orders;