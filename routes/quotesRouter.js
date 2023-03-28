const router = require('express').Router();

const QuoteController = require('../controllers/QuotesController');

router.get('/', QuoteController.showAllQuotes);

module.exports = router;
