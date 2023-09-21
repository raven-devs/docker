import express from 'express';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('SIGTERM signal received!');
  process.exit();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
