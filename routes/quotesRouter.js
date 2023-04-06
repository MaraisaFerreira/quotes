const router = require('express').Router();

const QuoteController = require('../controllers/QuotesController');

const { authCheck } = require('../helpers/authCheck');

router.get('/dashboard', authCheck, QuoteController.showDashboard);

router.get('/quotes/add', authCheck, QuoteController.addQuote);
router.post('/quotes/add', authCheck, QuoteController.addQuotePost);

router.get('/', QuoteController.showAllQuotes);

module.exports = router;
