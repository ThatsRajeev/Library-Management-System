const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Uzer', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
});

module.exports = mongoose.model('Transaction', transactionSchema);
