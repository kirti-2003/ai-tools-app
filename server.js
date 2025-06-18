// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tools = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let favorites = [];

// GET /api/tools: Return all AI tools
app.get('/api/tools', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredTools = tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
    return res.json(filteredTools);
  }
  res.json(tools);
});

// POST /api/favorites: Save a tool to favorites
app.post('/api/favorites', (req, res) => {
  const { toolId } = req.body;
  if (favorites.includes(toolId)) {
    return res.status(400).json({ message: "Tool is already in favorites." });
  }
  favorites.push(toolId);
  res.status(201).json({ message: "Tool added to favorites." });
});

// GET /api/favorites: List all saved favorites
app.get('/api/favorites', (req, res) => {
  const favoriteTools = tools.filter(tool => favorites.includes(tool.id));
  res.json(favoriteTools);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
