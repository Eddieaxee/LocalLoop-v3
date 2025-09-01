// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import the authentication routes
const authRoutes = require('./routes/authRoutes');

// Initialize the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a simple root route for testing if the server is running
app.get('/', (req, res) => {
  res.send('LocalLoop Backend is running and connected to the database.');
});

// Use the authentication routes for the /api/auth endpoint
app.use('/api/auth', authRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));