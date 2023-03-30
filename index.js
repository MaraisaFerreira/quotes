const express = require('express');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const FileStore = require('session-file-store')(session);

/* DB */
const conn = require('./db/conn');
const User = require('./models/User');
const Quote = require('./models/Quote');

/* Rotas */
const quotesRouter = require('./routes/quotesRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set flash messages
app.use(flash());

//set session
app.use(
	session({
		name: 'session',
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new FileStore({
			logFn: function () {},
			path: require('path').join(require('os').tmpdir(), 'sessions'),
		}),
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 360000,
			expires: new Date(Date.now() + 360000),
		},
	}),
);

//set session to res
app.use((req, res, next) => {
	if (req.session.userid) {
		res.locals.session = req.session;
	}

	next();
});

app.use('/', quotesRouter);
app.use('/', authRouter);

conn.sync().then(() => {
	console.log('Conectado ao DB...');

	app.listen(process.env.PORT, () => {
		console.log(`Server running on port ${process.env.PORT}...`);
	});
});
