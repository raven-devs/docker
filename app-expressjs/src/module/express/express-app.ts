import express from 'express';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hi there!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const gracefulShutdown = (signal: string) => {
  console.log(`${signal} signal received, shutting down...`);
  process.exit();
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // Sent by nodemon
