const { DataTypes } = require("sequelize");
const db = require("../db");

const Clients = db.define("comments", {
  clientId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.TEXT,
    required: true,
  },
  lastName: {
    type: DataTypes.TEXT,
    required: true,
  },
  phoneNumber: {
    type: DataTypes.NUMBER,
    required: true,
  },
  address: {
    type: DataTypes.STRING,
    required: true,
  }
});

module.exports = Clients;