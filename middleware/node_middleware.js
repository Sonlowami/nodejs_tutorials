const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const router = express.Router();
const JWT_SECRET = "this is a dumb secret";

const users = [
  {email: 'abc@gmail.com', password:'abcdent'},
  {email: 'yuanayuso@gmail.com', password:'climberjuan'}
]


function handleLogIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if ({ email, password } in users) {
    const token = jwt.sign({ email }, jwtKey, { algorithm: 'SHA256', expireIn: 300});
    return res.status(200).send({ token });
  }
  return res.status(401).end();
}

function validateLoginCredentials(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) { return res.status(400).end(); }
  next();
}

router.post('/login', validateLoginCredentials, handleLogIn);

app.use('/', router);
app.listen(3000);
