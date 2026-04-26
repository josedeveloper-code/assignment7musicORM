require('dotenv').config();
const express = require('express');
const { sequelize, Track } = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// 1. GET /api/tracks - Returns all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

// 2. GET /api/tracks/:id - Returns a specific track
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching track' });
  }
});

// 3. POST /api/tracks - Create a new track
app.post('/api/tracks', async (req, res) => {
  try {
    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;
    
    // Simple validation check
    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear
    });
    res.status(201).json(newTrack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create track' });
  }
});

// 4. PUT /api/tracks/:id - Update an existing track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    await track.update(req.body);
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update track' });
  }
});

// 5. DELETE /api/tracks/:id - Delete a track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    await track.destroy();
    res.json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete track' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});