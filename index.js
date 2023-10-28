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
import paymentRoute from './routes/payment.js';
import travelerRoute from './routes/traveler.js';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passportConfig.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import cors from 'cors';
import User from './models/User.js';



const app = express();
dotenv.config();

// Set up CORS middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://triplo-flights.vercel.app'],
  methods: 'GET, POST, DELETE, PUT',
  credentials: true,
}));

// Set up middleware to enable JSON parsing
app.use(express.json());


// Set up session middleware
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);


// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Initialize and configure Passport for authentication
app.use(passport.initialize());
app.use(passport.session());



passport.use(
  new GoogleStrategy(
    {
      // Google OAuth2 credentials
      clientID: process.env.GOOGLE_CLIENT_API_KEY,
      clientSecret: process.env.GOOGLE_SECRET_API_KEY,
      callbackURL: 'https://triplo-flight.onrender.com/api/auth/google/callback',
      
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log('Google OAuth2 strategy called');
      try {
        // Check if the user already exists in database
        let user = await User.findOne({ googleId: profile.id });
        // console.log(profile);
        if (!user) {
          // Create a new user if not found
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            userName: profile.emails[0].value,
          });
        }
       

        // Call done with null for the error and the user object
        return done(null, user);
      } catch (error) {
        // Call done with the error object and false for the user
        console.log('new error', error)
        return done(error, false);
      }
    }
  )
);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});













// Logging for MongoDB connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
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




// Session timeout middleware
const sessionTimeOut = 20 * 60 * 1000; // 20 minutes
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
app.use('/api/flight', flightRoute);
app.use('/api/package', packageRoute);
app.use('/api/visa', visaRoute);
app.use('/api/bookSchedule', bookSchedule);
app.use('/api/traveler', travelerRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/airport', airportRoute);

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

// Root route
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

// Start the server
app.listen(8800, () => {
  connect();
  console.log('Backend is connected');
});


















// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoute from './routes/auth.js';
// import hotelsRoute from './routes/hotels.js';
// import usersRoute from './routes/users.js';
// import flightRoute from './routes/flight.js';
// import packageRoute from './routes/package.js';
// import visaRoute from './routes/visa.js';
// import bookSchedule from './routes/BookSchedule.js';
// import airportRoute from './routes/airport.js';
// import paymentRoute from './routes/payment.js'
// import travelerRoute from './routes/traveler.js'
// import bodyParser from 'body-parser';
// import passport from 'passport';
// import './config/passportConfig.js';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import crypto from 'crypto';
// import cors from 'cors';



// const app = express();
// dotenv.config();
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   res.setHeader('Content-Type', 'application/json');

//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB);
//     console.log('connected to mongodb');
//   } catch (error) {
//     throw error;
//   }
// };

// mongoose.set('debug', true);
// mongoose.connection.on('disconnected', () => {
//   console.log('mongodb disconnected');
// });
// mongoose.connection.on('connected', () => {
//   console.log('mongodb connected');
// });

// const secretKey = crypto.randomBytes(32).toString('hex');

// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     methods: 'GET, POST, DELETE, PUT',
//     credentials: true,
//   })
//   );
// app.use(express.json());
// app.use(
//   session({
//     secret: secretKey,
//     resave: true,
//     cookie: { maxAge: 1000 * 60 * 20 },
//     saveUninitialized: true,
//   })
// );

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/api/auth', authRoute);
// app.use('/api/hotels', hotelsRoute);
// app.use('/api/users', usersRoute);
// app.use('/api/flight', flightRoute);
// app.use('/api/package', packageRoute);
// app.use('/api/visa', visaRoute);
// app.use('/api/bookSchedule', bookSchedule);
// app.use('/api/traveler', travelerRoute)
// app.use('/api/payment', paymentRoute)
// app.use('/api/auth', (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });
// app.use('/api/airport', (req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });
// app.use('/api/airport', airportRoute);

// app.use((err, req, res, next) => {
//   const errStatus = err.status || 500;
//   const errMessage = err.message || 'something wrong';
//   return res.status(errStatus).json({
//     success: false,
//     message: errMessage,
//     status: errStatus,
//     stack: err.stack,
//   });
// });


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




// app.get('/', (req, res) => {
//   res.send('Hello, this is the root route!');
// });

// app.listen(8800, () => {
//   connect();
//   console.log('backend is connected');
// });
