const express = require('express');
const Uzer = require('../models/user');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = new Uzer({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await Uzer.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
