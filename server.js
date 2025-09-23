
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

let users = [];

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash: hash });
  res.send('Signup successful! Go to login.');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    req.session.user = username;
    res.send('Login successful!');
  } else {
    res.send('Invalid credentials');
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
