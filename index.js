import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import flightRoute from './routes/flight.js';
import packageRoute from './routes/package.js';
import bookSchedule from './routes/BookSchedule.js';
import airportRoute from './routes/airport.js'
import cookieParser from 'cookie-parser';

import cors from 'cors';


const app = express();
dotenv.config();
app.use((req, res, next) => {
  // Allow requests from any origin (you can restrict it to specific origins if needed)
  
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Set the Content-Type header to indicate the response format
  res.setHeader('Content-Type', 'application/json');

  // Allow additional headers if required
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Allow the use of specific HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Continue to the next middleware or route handler
  next();
});
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('connected to mongodb');
  } catch (error) {
    throw error;
  }
};


mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('mongodb connected');
});
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('first request');
});
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);
app.use('/api/flight', flightRoute);
app.use('/api/package', packageRoute);
app.use('/api/bookSchedule', bookSchedule);
app.use('/api/airport', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/api/airport', airportRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'something wrong';
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    status: errStatus,
    stack: err.stack,
  });
});


app.listen(8800, () => {
  connect();
  console.log('backend is connected');
});
