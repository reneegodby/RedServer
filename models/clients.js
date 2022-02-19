const { DataTypes } = require("sequelize");
const db = require("../db");

const Clients = db.define("client", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    required: true,
  },
  lastName: {
    type: DataTypes.STRING,
    required: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    required: true,
  },
  address: {
    type: DataTypes.STRING,
    required: true,
  },
  notes: {
    type: DataTypes.STRING(2000),
    required: false,
  },
});

module.exports = Clients;
