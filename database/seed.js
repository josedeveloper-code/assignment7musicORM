// Import the database instance and the Track model from setup.js
// Adjust the path '../database/setup' if your file structure is different
const { sequelize, Track } = require('./setup'); 

const seedData = [
  {
    songTitle: "Bohemian Rhapsody",
    artistName: "Queen",
    albumName: "A Night at the Opera",
    genre: "Rock",
    duration: 354,
    releaseYear: 1975
  },
  {
    songTitle: "Billie Jean",
    artistName: "Michael Jackson",
    albumName: "Thriller",
    genre: "Pop",
    duration: 294,
    releaseYear: 1982
  },
  {
    songTitle: "Hotel California",
    artistName: "Eagles",
    albumName: "Hotel California",
    genre: "Rock",
    duration: 391,
    releaseYear: 1976
  }
];

async function seedDatabase() {
  try {
    // Authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Use bulkCreate to insert all tracks at once
    await Track.bulkCreate(seedData);
    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Unable to seed the database:', error);
  } finally {
    // Always close the connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

// Execute the seed function
seedDatabase();