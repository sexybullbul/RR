const express = require('express');
const connectDB = require('./db');
const Movie = require('./models/Movie');

const app = express();
app.use(express.json());

connectDB();

const moviesData = [
  {
    name: "Inception",
    type: "Sci-Fi",
    releaseYear: 2010,
    rating: 8.8,
    language: "English",
    director: { name: "Christopher Nolan", age: 50 },
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    boxOffice: 829895144,
    availableOn: ["Netflix", "Amazon Prime"],
    awards: { oscar: true, bafta: true }
  },
  {
    name: "The Dark Knight",
    type: "Action",
    releaseYear: 2008,
    rating: 9.0,
    language: "English",
    director: { name: "Christopher Nolan", age: 50 },
    cast: ["Christian Bale", "Heath Ledger"],
    boxOffice: 1004558444,
    availableOn: ["HBO Max"],
    awards: { oscar: true, bafta: true }
  },
  {
    name: "Leo",
    type: "Action",
    releaseYear: 2024,
    rating: 8.0,
    language: "Tamil",
    director: { name: "Lokesh Kanagaraj", age: 30 },
    cast: ["Vijay", "Trisha"],
    boxOffice: 1000,
    availableOn: ["Netflix"],
    awards: { oscar: false, bafta: false }
    }
];

app.post('/movies/add', async (req, res) => {
  try {
    await Movie.insertMany(moviesData);
    res.status(201).json({ message: "Movies added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
