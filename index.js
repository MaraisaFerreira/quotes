const express = require('express');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const fileStore = require('session-file-store')(session);

const conn = require('./db/conn');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

conn.sync().then(() => {
	console.log('Conectado ao DB...');

	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}...`);
	});
});
