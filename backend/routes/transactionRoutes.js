const express = require('express');
const Transaction = require('../models/transaction');
const Book = require('../models/book');
const router = express.Router();

// Borrow a book with user and book details in the response
router.post('/borrow', async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (!book.availabilityStatus) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        const transaction = new Transaction({ bookId, userId });
        book.availabilityStatus = false;

        await transaction.save();
        await book.save();

        const populatedTransaction = await Transaction.findById(transaction._id)
            .populate('bookId', 'title author')
            .populate('userId', 'name email');

        res.status(201).json({
            message: 'Book borrowed successfully!',
            transaction: populatedTransaction
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all borrowed books by a specific user
router.get('/borrowed/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId, returnDate: null })
            .populate('bookId', 'title author')
            .populate('userId', 'name email');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Return a book with confirmation details
router.post('/return/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        if (transaction.returnDate) {
            return res.status(400).json({ message: 'Book has already been returned' });
        }

        const book = await Book.findById(transaction.bookId);
        transaction.returnDate = new Date();
        book.availabilityStatus = true;

        await transaction.save();
        await book.save();

        res.status(200).json({
            message: 'Book returned successfully!',
            transaction,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all transactions with detailed information
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('bookId', 'title author')
            .populate('userId', 'name email');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
