const { DataTypes } = require('sequelize');

const conn = require('../db/conn');
const User = require('./User');

const Quote = conn.define('Quote', {
	title: { type: DataTypes.STRING, allowNull: false },
	author: { type: DataTypes.STRING },
});

Quote.belongsTo(User);
User.hasMany(Quote);

module.exports = Quote;
