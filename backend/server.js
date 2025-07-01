const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Optional: handle unknown routes and serve index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dummy in-memory user store
const users = [];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) return res.json({ success: true, token: 'dummy-token' });
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Missing fields' });

  if (users.find(u => u.email === email))
    return res.status(409).json({ success: false, message: 'User already exists' });

  users.push({ email, password });
  return res.json({ success: true, message: 'Registered successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
