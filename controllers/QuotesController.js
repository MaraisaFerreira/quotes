const User = require('../models/User');
const Quote = require('../models/Quote');

module.exports = class QuoteController {
	static showAllQuotes(req, res) {
		res.render('index');
	}

	static async showDashboard(req, res) {
		res.render('quotes/dashboard');
	}

	static addQuote(req, res) {
		res.render('quotes/addQuote');
	}
};
