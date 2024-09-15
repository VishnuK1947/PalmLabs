const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users', async (req, res) => {
  const { username, selected_text, hard_letters } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO users(username, selected_text, hard_letters) VALUES($1, $2, $3) RETURNING *',
      [username, selected_text, hard_letters]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

// Get a user by username
app.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

// Update a user
app.put('/users/:username', async (req, res) => {
  const { username } = req.params;
  const { selected_text, hard_letters } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET selected_text = $1, hard_letters = $2 WHERE username = $3 RETURNING *',
      [selected_text, hard_letters, username]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

// Delete a user
app.delete('/users/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});