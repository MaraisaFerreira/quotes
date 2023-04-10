function authCheck(req, res, next) {
	const userHasId = req.session.userid;

	if (!userHasId) {
		console.log('Block!');
		res.redirect('/login');
	}

	next();
}

module.exports = { authCheck };
