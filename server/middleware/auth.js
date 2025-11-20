const { auth } = require('../lib/auth');

module.exports = async function (req, res, next) {
    try {
        const session = await auth.api.getSession({
            headers: new Headers(req.headers)
        });

        if (!session) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        req.user = session.user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
