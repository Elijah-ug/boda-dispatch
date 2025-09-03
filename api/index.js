import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/locationRoutes.js';

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const locationApi = '/api/location/';
app.use(`${locationApi}ip`, router);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
