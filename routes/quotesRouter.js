const router = require('express').Router();

const QuoteController = require('../controllers/QuotesController');

const { authCheck } = require('../helpers/authCheck');

router.get('/dashboard', authCheck, QuoteController.showDashboard);
router.get('/quotes/add', QuoteController.addQuote);
router.get('/', QuoteController.showAllQuotes);

module.exports = router;
