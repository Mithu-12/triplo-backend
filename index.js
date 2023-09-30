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
import paymentRoute from './routes/payment.js'
import travelerRoute from './routes/traveler.js'
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passportConfig.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import cors from 'cors';
import { ObjectId } from 'mongodb';
import SSLCommerzPayment from 'sslcommerz-lts'


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
app.use('/api/traveler', travelerRoute)
app.use('/api/payment', paymentRoute)
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




// const tran_id = new ObjectId().toString();


// const store_id = process.env.SSLCOMMERZ_CLIENT_API_KEY || `tripl64da52b55e880`;
// const store_passwd = process.env.SSLCOMMERZ_SECRET_API_KEY || `tripl64da52b55e880@ssl`;
// const is_live = false;

// app.post('/payment-process', async (req, res) => {
//   const order = req.body;
  
//   try {
//     // const productData = await Package.findOne({ _id: new mongoose.Types.ObjectId(req.body.productId) });

//     // if (!productData) {
//     //   return res.status(404).json({ error: 'Package not found' });
//     // }
//     const data = {
//       total_amount: 'order.price',
//       currency: 'BDT',
//       tran_id: tran_id, // use unique tran_id for each api call
//       success_url: 'http://localhost:3030/success',
//       fail_url: 'http://localhost:3030/fail',
//       cancel_url: 'http://localhost:3030/cancel',
//       ipn_url: 'http://localhost:3030/ipn',
//       shipping_method: 'Courier',
//       product_name: 'order?.paymentType',
//       product_category: 'Electronic',
//       product_profile: 'general',
//       cus_name: 'order?.address?.firstName',
//       cus_email: 'order?.address?.email',
//       cus_add1: 'order?.address',
//       cus_add2: 'Dhaka',
//       cus_city: 'Dhaka',
//       cus_state: 'Dhaka',
//       cus_postcode: '1000',
//       cus_country: 'Bangladesh',
//       cus_phone: '01711111111',
//       cus_fax: '01711111111',
//       ship_name: 'Customer Name',
//       ship_add1: 'Dhaka',
//       ship_add2: 'Dhaka',
//       ship_city: 'Dhaka',
//       ship_state: 'Dhaka',
//       ship_postcode: 1000,
//       ship_country: 'Bangladesh',
//     };
//     try {
//       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//       sslcz.init(data).then((apiResponse) => {
//         try {
//           // Redirect the user to payment gateway
//           let GatewayPageURL = apiResponse.GatewayPageURL;
//           res.send({ url: GatewayPageURL });
//           console.log('Redirecting to: ', GatewayPageURL);
//         } catch (error) {
//           console.error('Error during redirection:', error);
//           res.status(500).json({ error: 'An error occurred during redirection' });
//         }
//       });
//     } catch (error) {
//       console.error('Error during SSLCommerzPayment initialization:', error);
//       res.status(500).json({ error: 'An error occurred during payment processing' });
//     }   

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred during payment processing' });
//   }
// });





app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.listen(8800, () => {
  connect();
  console.log('backend is connected');
});
