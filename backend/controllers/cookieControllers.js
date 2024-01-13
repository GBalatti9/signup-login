module.exports = {
    getCookie: async ( req, res, next ) => {
            if ( req.cookies.email ) {
                const { User } = require('../database/models');
        
                try {
                    const user = await User.findOne({ where: { email: req.cookies.email } });
        
                    delete user.id;
                    delete user.password;
        
                    req.session.user = user;

                    return res.json({ success: user })
        
                } catch (error) {
                    console.log( error );
                }
            } else {
                return res.json({ error: 'There is not user in cookie' });
            }
        
            next();
    }
}