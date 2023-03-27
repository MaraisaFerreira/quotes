const express = require('express');
require('dotenv').config();

const conn = require('./db/conn');

const app = express();

conn.sync().then(() => {
	console.log('Conectado ao DB...');

	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}...`);
	});
});
