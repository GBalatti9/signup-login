const isLoggedMiddleware = ( req, res, next ) => {
    if ( req.session.user ) {
        // return res.redirect('/');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

module.exports = {
    isLoggedMiddleware,
}