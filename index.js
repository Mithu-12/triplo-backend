import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import flightRoute from './routes/flight.js';
import packageRoute from './routes/package.js';
import visaRoute from './routes/visa.js';
import bookSchedule from './routes/BookSchedule.js';
import airportRoute from './routes/airport.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passportConfig.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import cors from 'cors';


const app = express();
dotenv.config();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
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

mongoose.set('debug', true);
mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('mongodb connected');
});

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, DELETE, PUT',
    credentials: true,
  })
  );
app.use(express.json());
app.use(
  session({
    secret: 'thisissession',
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);
app.use('/api/flight', flightRoute);
app.use('/api/package', packageRoute);
app.use('/api/visa', visaRoute);
app.use('/api/bookSchedule', bookSchedule);
app.use('/api/auth', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
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


app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.listen(8800, () => {
  connect();
  console.log('backend is connected');
});
