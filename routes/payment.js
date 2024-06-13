import express from "express";
import { ObjectId } from "mongodb";
import SSLCommerzPayment from "sslcommerz-lts";
import Payment from "../models/Payment.js";
// import mongoose from 'mongoose';
// import ObjectId from 'mongoose'

const router = express.Router();
// const Package = mongoose.model('Package');

const tran_id = new ObjectId().toString();

const store_id = process.env.SSLCOMMERZ_CLIENT_API_KEY;
const store_passwd = process.env.SSLCOMMERZ_SECRET_API_KEY;
const is_live = false;

router.post("/payment-process/:paymentOption", async (req, res) => {
  const {
    paymentOption,
    price,
    email,
    firstName,
    paymentType,
    travelers,
    travelersData,
    productData,
    serviceType,
    userId,
  } = req.body;

  try {
    const data = {
      total_amount: price,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `https://triplo-backend.up.railway.app/api/payment/success/${tran_id}`,
      fail_url: `https://triplo-backend.up.railway.app/api/payment/failed/${tran_id}`,
      cancel_url: `https://triplo-backend.up.railway.app/api/payment/cancel/${tran_id}`,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: paymentType,
      product_category: "Electronic",
      product_profile: "general",
      cus_name: firstName,
      cus_email: email,
      cus_add1: "hello",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    // console.log(data)
    try {
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then(async (apiResponse) => {
        // Redirect the user to payment gateway
        // console.log('apiResponse',apiResponse)
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log("Redirecting to: ", GatewayPageURL);
        const finalOrder = new Payment({
          productData: productData,
          travelersData: req.body,
          price: price,
          travelers: travelers,
          paymentType: paymentType,
          serviceType: serviceType,
          userId: userId,
          paymentStatus: false,
          tranId: tran_id,
        });
        await finalOrder.save();
      });
      router.post("/success/:tranId", async (req, res) => {
        const paymentUpdate = await Payment.updateOne(
          {
            tranId: req.params.tranId,
          },
          {
            $set: {
              paymentStatus: "success",
            },
          }
        );
        if (paymentUpdate.modifiedCount > 0) {
          res.redirect(
            `https://triplo-flights.vercel.app/app/account/bookings/${serviceType}`
          );
        }
      });
      router.post("/failed/:tranId", async (req, res) => {
        const paymentUpdate = await Payment.updateOne(
          {
            tranId: req.params.tranId,
          },
          {
            $set: {
              paymentStatus: "failed",
            },
          }
        );
        if (paymentUpdate.modifiedCount > 0) {
          res.redirect(
            `https://triplo-flights.vercel.app/app/account/bookings/${serviceType}`
          );
        }
      });
      router.post("/cancel/:tranId", async (req, res) => {
        const paymentUpdate = await Payment.updateOne(
          {
            tranId: req.params.tranId,
          },
          {
            $set: {
              paymentStatus: "cancel",
            },
          }
        );
        if (paymentUpdate.modifiedCount > 0) {
          res.redirect(
            `https://triplo-flights.vercel.app/app/account/bookings/${serviceType}`
          );
        }
      });
    } catch (error) {
      console.error("Error during SSLCommerzPayment initialization:", error);
      res
        .status(500)
        .json({ error: "An error occurred during payment processing" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred during payment processing" });
  }
});

// Backend route to fetch payment data based on userId and serviceType
router.get("/:userId/:serviceType", async (req, res) => {
  const userId = req.params.userId;
  const serviceType = req.params.serviceType;
  console.log("userId, serviceType", userId, serviceType);
  try {
    // Fetch payment data for the specified userId and serviceType
    const payments = await Payment.find({ userId, serviceType });
    console.log("payments", payments);
    res.json(payments);
  } catch (error) {
    console.error("Error fetching payment data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payment data" });
  }
});

export default router;

// import express from 'express';
// import { ObjectId } from 'mongodb';
// import SSLCommerzPayment from 'sslcommerz-lts';
// import Payment from '../models/Payment.js';
// // import mongoose from 'mongoose';
// // import ObjectId from 'mongoose'

// const router = express.Router();
// // const Package = mongoose.model('Package');

// const tran_id = new ObjectId().toString();

// const store_id = process.env.SSLCOMMERZ_CLIENT_API_KEY;
// const store_passwd = process.env.SSLCOMMERZ_SECRET_API_KEY;
// const is_live = false;

// router.post('/payment-process', async (req, res) => {
//   const order = req.body;
//   console.log('product', order?.productData);
//   try {
//     const data = {
//       total_amount: order.price,
//       currency: 'BDT',
//       tran_id: tran_id, // use unique tran_id for each api call
//       success_url: `https://triplo-backend.up.railway.app/api/payment/success/${tran_id}`,
//       fail_url: `https://triplo-backend.up.railway.app/api/payment/failed/${tran_id}`,
//       cancel_url: `https://triplo-backend.up.railway.app/api/payment/cancel/${tran_id}`,
//       ipn_url: 'http://localhost:3030/ipn',
//       shipping_method: 'Courier',
//       product_name: order?.paymentType,
//       product_category: 'Electronic',
//       product_profile: 'general',
//       cus_name: order?.firstName,
//       cus_email: order?.email,
//       cus_add1: order?.address,
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
//     // console.log(data)
//     try {
//       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//       sslcz.init(data).then(async (apiResponse) => {
//         // Redirect the user to payment gateway
//         // console.log('apiResponse',apiResponse)
//         let GatewayPageURL = apiResponse.GatewayPageURL;
//         res.send({ url: GatewayPageURL });
//         console.log('Redirecting to: ', GatewayPageURL);
//         const finalOrder = new Payment({
//           product: order?.productData,
//           paymentStatus: false,
//           tranId: tran_id,
//         });
//         await finalOrder.save();
//       });
//       router.post('/success/:tranId', async (req, res) => {
//         const paymentUpdate = await Payment.updateOne(
//           {
//             tranId: req.params.tranId,
//           },
//           {
//             $set: {
//               paymentStatus: true,
//             },
//           }
//         );
//         if (paymentUpdate.modifiedCount > 0) {
//           res.redirect(
//             `http://localhost:5173/payment/success/${req.params.tranId}`
//           );
//         }
//       });
//       router.post('/failed/:tranId', async (req, res) => {
//         const payment = await Payment.deleteOne({
//           tranId: req.params.tranId,
//         });
//         if (payment.deletedCount) {
//           res.redirect(
//             `http://localhost:5173/payment/failed/${req.params.tranId}`
//           );
//         }
//       });
//       router.post('/cancel/:tranId', async (req, res) => {
//         const payment = await Payment.deleteOne({
//           tranId: req.params.tranId,
//         });
//         if (payment.deletedCount) {
//           res.redirect(
//             `http://localhost:5173/payment/cancel/${req.params.tranId}`
//           );
//         }
//       });
//     } catch {
//       console.error('Error during SSLCommerzPayment initialization:', error);
//       res
//         .status(500)
//         .json({ error: 'An error occurred during payment processing' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res
//       .status(500)
//       .json({ error: 'An error occurred during payment processing' });
//   }
// });

// export default router;

// // Assuming you have a route handler for processing payments
// app.post('/process-payment', async (req, res) => {
//     try {
//       const { amount, cardNumber, expiryDate, cvv } = req.body;

//       // Perform validation on the payment details
//       if (!amount || !cardNumber || !expiryDate || !cvv) {
//         return res.status(400).json({ error: 'Invalid payment details' });
//       }

//       // Connect to the payment gateway and initiate the payment
//       const paymentGateway = new PaymentGateway(); // Initialize your payment gateway library
//       const paymentResult = await paymentGateway.processPayment({
//         amount,
//         cardNumber,
//         expiryDate,
//         cvv,
//       });

//       // Check the payment result
//       if (paymentResult.success) {
//         // Payment succeeded
//         // Update your database or perform any necessary actions

//         // Return a success response to the client
//         return res.status(200).json({ message: 'Payment successful' });
//       } else {
//         // Payment failed
//         // Handle the failure scenario and return an error response to the client

//         return res.status(400).json({ error: 'Payment failed' });
//       }
//     } catch (error) {
//       // Handle any errors that occur during the payment process
//       return res.status(500).json({ error: 'An error occurred during payment processing' });
//     }
//   });
