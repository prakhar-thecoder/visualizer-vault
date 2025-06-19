const { findOne } = require('../utils/db');

const requireAuth = async (req, res, next) => {
    const authToken = req.cookies.auth_token;
    
    if (!authToken) {
        return res.redirect('/admin/login');
    }

    try {
        // Check if token exists in the database and is not expired
        const session = await findOne('sessions', { 
            token: authToken,
            expiresAt: { $gt: new Date() }
        });

        if (!session) {
            res.clearCookie('auth_token');
            return res.redirect('/admin/login');
        }

        // Attach user info to the request
        req.user = { id: session.userId };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.clearCookie('auth_token');
        res.redirect('/admin/login');
    }
};

module.exports = { requireAuth };
