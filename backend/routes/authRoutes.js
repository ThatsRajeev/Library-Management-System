const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthUser = require('../models/authUser');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await AuthUser.create({
            name,
            email,
            password,
            isAdmin: isAdmin || false,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthUser.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
