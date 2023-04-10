const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = class AuthController {
	static showLogin(req, res) {
		res.render('auth/login');
	}

	static async loginPost(req, res) {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			req.flash('message', 'Esse email não existe...');
			res.render('auth/login');
			return;
		}

		const passwordMatch = bcrypt.compareSync(password, user.password);

		if (!passwordMatch) {
			req.flash('message', 'Senha incorreta...');
			res.render('auth/login');
			return;
		}

		req.session.userid = user.id;
		req.flash('message', 'Autenticado com sucesso!');
		req.session.save(() => {
			res.redirect('/');
		});
	}

	static showRegister(req, res) {
		res.render('auth/register');
	}

	static async register(req, res) {
		const { name, email, password, password_verify } = req.body;

		if (password != password_verify) {
			req.flash('message', 'As senha não conferem...');
			res.render('auth/register');

			return;
		}

		const checkIfEmailExists = await User.findOne({ where: { email } });
		if (checkIfEmailExists) {
			req.flash('message', 'Esse email já existe...');
			res.render('auth/register');

			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		console.log(hashedPassword);

		const user = {
			name,
			email,
			password: hashedPassword,
		};

		User.create(user)
			.then((user) => {
				req.session.userid = user.id;

				req.flash('message', 'Cadastro registrado com sucesso!');

				req.session.save(() => {
					res.redirect('/');
				});
			})
			.catch((err) => console.log(err));
	}

	static logout(req, res) {
		req.session.destroy();
		res.redirect('/login');
	}
};
