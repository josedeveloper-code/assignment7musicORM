require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || 'music_library.db'
});

const Track = sequelize.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

async function setupDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await sequelize.close();
        console.log("Database setup complete");
    } catch (error) {
        console.error(error);
    }
}

if (require.main === module) {
    setupDatabase();
}

module.exports = { sequelize, Track };