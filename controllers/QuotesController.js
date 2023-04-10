const User = require('../models/User');
const Quote = require('../models/Quote');

module.exports = class QuoteController {
	static showAllQuotes(req, res) {
		res.render('index');
	}

	static showDashboard(req, res) {
		Quote.findAll({ where: { UserId: req.session.userid }, raw: true })
			.then((quotes) => {
				res.render('quotes/dashboard', { quotes });
			})
			.catch((err) => console.log(err));
	}

	static addQuote(req, res) {
		res.render('quotes/addQuote');
	}

	static addQuotePost(req, res) {
		const quote = {
			title: req.body.quote,
			author: req.body.author,
			UserId: req.session.userid,
		};

		Quote.create(quote)
			.then(() => {
				req.flash('message', 'Citação adicionada com sucesso...');

				req.session.save(() => {
					res.redirect('/dashboard');
				});
			})
			.catch((err) => console.log(err));
	}

	static editQuote(req, res) {
		const id = req.params.id;

		Quote.findOne({ where: { id }, raw: true })
			.then((quote) => {
				res.render('quotes/edit', { quote });
			})
			.catch((err) => console.log(err));
	}

	static removeQuote(req, res) {
		const id = req.body.quote_id;

		Quote.destroy({ where: { id } })
			.then(() => {
				req.session.save(() => {
					req.flash('message', 'Citação removida com sucesso!');
					res.redirect('/dashboard');
				});
			})
			.catch((err) => console.log(err));
	}
};
