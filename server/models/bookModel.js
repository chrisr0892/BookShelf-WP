const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Book({
  title: { type: String, required: true, unique: true },
  Author: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
