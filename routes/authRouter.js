const router = require('express').Router();

const AuthController = require('../controllers/AuthController');

router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.loginPost);
router.get('/logout', AuthController.logout);

router.get('/register', AuthController.showRegister);
router.post('/register', AuthController.register);

module.exports = router;
