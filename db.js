const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
})

module.exports = sequelize;