const User = require('../models/User');
const Quote = require('../models/Quote');

module.exports = class QuoteController {
	static showAllQuotes(req, res) {
		res.render('index');
	}
};
