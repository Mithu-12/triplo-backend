// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoute from './routes/auth.js';
// import usersRoute from './routes/users.js';
// import hotelsRoute from './routes/hotels.js';
// import packageRoute from './routes/package.js';
// import visaRoute from './routes/visa.js';
// import airportRoute from './routes/airport.js';
// import paymentRoute from './routes/payment.js';
// import travelerRoute from './routes/traveler.js';
// import passport from 'passport';
// import './config/passportConfig.js';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import crypto from 'crypto';
// import cors from 'cors';



// const app = express();
// dotenv.config();

// // Set up CORS middleware
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://triplo-flights.vercel.app'],
//   methods: 'GET, POST, DELETE, PUT',
//   credentials: true,
// }));

// // Set up middleware to enable JSON parsing
// app.use(express.json());


// // Set up session middleware
// const secretKey = crypto.randomBytes(32).toString('hex');
// app.use(
//   session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );


// app.use(cookieParser());

// // Initialize and configure Passport for authentication
// app.use(passport.initialize());
// app.use(passport.session());

// // Logging for MongoDB connection
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };

// mongoose.set('debug', true);
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected');
// });

// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected');
// });

// mongoose.connection.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });



// // Session timeout middleware
// const sessionTimeOut = 20 * 60 * 1000; // 20 minutes
// app.use((req, res, next) => {
//   if (req.session.createdAt) {
//     const currentTime = new Date().getTime();
//     const sessionTime = new Date(req.session.createdAt).getTime();

//     // Calculate the session duration
//     const sessionDuration = currentTime - sessionTime;

//     // If the session duration exceeds the timeout, destroy the session
//     if (sessionDuration > sessionTimeOut) {
//       req.session.destroy((error) => {
//         if (error) {
//           console.error('Error destroying session', error);
//         }
//       });
//     }
//   }

//   // Set the current time as the session creation time
//   req.session.createdAt = new Date().toISOString();

//   // Pass sessionEndTime to the frontend (current time + session timeout)
//   req.session.sessionEndTime = new Date(Date.now() + sessionTimeOut).toISOString();

//   next();
// });

// // Configure routes
// app.use('/api/auth', authRoute);
// app.use('/api/hotels', hotelsRoute);
// app.use('/api/users', usersRoute);
// app.use('/api/package', packageRoute);
// app.use('/api/visa', visaRoute);
// app.use('/api/traveler', travelerRoute);
// app.use('/api/payment', paymentRoute);
// app.use('/api/airport', airportRoute);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || 'Something went wrong';
//   return res.status(errStatus).json({
//     success: false,
//     message: errMessage,
//     status: errStatus,
//     stack: err.stack,
//   });
// });


// app.get('/', (req, res) => {
//   res.send('Hello, this is the root route!');
// });


// app.listen(8800, () => {
//   connect();
//   console.log('Backend is connected');
// });



import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import packageRoute from './routes/package.js';
import visaRoute from './routes/visa.js';
import airportRoute from './routes/airport.js';
import paymentRoute from './routes/payment.js';
import travelerRoute from './routes/traveler.js';
import passport from 'passport';
import './config/passportConfig.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
dotenv.config();

// Set up CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://triplo-flights.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

// Set up middleware to enable JSON parsing
app.use(express.json());

// Set up session middleware
const secretKey = crypto.randomBytes(32).toString('hex');
const sessionTimeOut = 20 * 60 * 1000; // 20 minutes
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: sessionTimeOut,
    },
  })
);

app.use(cookieParser());

// Initialize and configure Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Logging for MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

mongoose.set('debug', true);
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Session timeout middleware
app.use((req, res, next) => {
  if (req.session.createdAt) {
    const currentTime = new Date().getTime();
    const sessionTime = new Date(req.session.createdAt).getTime();

    // Calculate the session duration
    const sessionDuration = currentTime - sessionTime;

    // If the session duration exceeds the timeout, destroy the session
    if (sessionDuration > sessionTimeOut) {
      req.session.destroy((error) => {
        if (error) {
          console.error('Error destroying session', error);
        }
      });
    }
  }

  // Set the current time as the session creation time
  req.session.createdAt = new Date().toISOString();

  // Pass sessionEndTime to the frontend (current time + session timeout)
  req.session.sessionEndTime = new Date(Date.now() + sessionTimeOut).toISOString();

  next();
});

// Configure routes
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);
app.use('/api/package', packageRoute);
app.use('/api/visa', visaRoute);
app.use('/api/traveler', travelerRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/airport', airportRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';
  return res.status(errStatus).json({
    success: false,
    message: errMessage,
    status: errStatus,
    stack: err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Backend is connected and running on port ${PORT}`);
});


