const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    availabilityStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', bookSchema);
