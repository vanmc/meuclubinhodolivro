const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    currentPage: { type: Number, required: true },
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
