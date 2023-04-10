function authCheck(req, res, next) {
	const userHasId = req.session.userid;

	if (!userHasId) {
		res.redirect('/login');
	}

	next();
}

module.exports = { authCheck };
