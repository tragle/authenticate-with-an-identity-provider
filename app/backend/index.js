import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const CLIENT_ID = process.env.CLIENT_ID;
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.text());
app.use(cors());

let count = 0;

const isValid = token => (
  token.exp * 1000 > Date.now()         // token is not expired
  && token.aud === CLIENT_ID            // client id is correct
  && token.scp === "counter.readwrite"  // scope is correct
);

app.post('/count', (req, res) => {
  const token = req.body;
  const decoded = jwt.decode(token);
  if (isValid(decoded)) {
    count++;
    res.json({ count });
  } else {
    res.status(403).send('Invalid access token');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
