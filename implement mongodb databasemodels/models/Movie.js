const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

const awardsSchema = new mongoose.Schema({
  oscar: { type: Boolean, required: true },
  bafta: { type: Boolean, required: true }
});

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  rating: { type: Number, required: true },
  language: { type: String, required: true },
  director: { type: directorSchema, required: true },
  cast: { type: [String], required: true },
  boxOffice: { type: Number, required: true },
  availableOn: { type: [String], required: true },
  awards: { type: awardsSchema, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
