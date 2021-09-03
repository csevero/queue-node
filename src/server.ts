import dotenv from 'dotenv';
import express from 'express';
import UserController from './app/controllers/UserController';

dotenv.config();

const app = express();

app.use(express.json());
app.post('/users', UserController.store);

app.listen(3333, () => {
  console.log('running');
});
