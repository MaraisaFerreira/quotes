const { Sequelize } = require('sequelize');

const conn = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
	host: process.env.HOST,
	dialect: 'mysql',
});

module.exports = conn;
