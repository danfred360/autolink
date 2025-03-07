import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello from Auth!');
});

app.listen(port, () => {
  console.log(`Auth server is running on port ${port}`);
});