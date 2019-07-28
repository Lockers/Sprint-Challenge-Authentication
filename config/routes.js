const axios = require('axios');
const bcrypt = require('bcryptjs')
const db = require('./router-helpers')
const { authenticate } = require('../auth/authenticate');
const jwt = require('jsonwebtoken');
const secret = require('./secrets')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db.add(user)
    // eslint-disable-next-line arrow-parens
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ Error: 'Internal Server Error' });
    });
}

function login(req, res) {
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ Message: `Welcome ${user.username}!`, Token: token });
      } else {
        res.status(401).json({ Message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ Error: 'Internal Server Error' });
    });
}


function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
