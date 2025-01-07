const jwt = require('jsonwebtoken');
const AuthUser = require('../models/authUser');

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await AuthUser.findById(decoded.id).select('-password'); 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

module.exports = { protect, admin };
