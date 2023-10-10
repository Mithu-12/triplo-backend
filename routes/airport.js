import express from 'express';
import { searchFlights } from '../controller/airport.js';
import { v4 as uuidv4 } from 'uuid'


const router = express.Router();



// export default router;
router.get('/search', async (req, res, next) => {
  try {

    const searchUid = uuidv4();
    const itineraryUid = uuidv4();

    // Store them in the user's session
    req.session.searchUid = searchUid;
    req.session.itineraryUid = itineraryUid;
    // Retrieve the parameters from the query string
    const originLocationCode = req.query.originLocationCode;
    const destinationLocationCode = req.query.destinationLocationCode;
    const departureDate = req.query.departureDate;
    const adults = req.query.adults;
    const returnDate = req.query.returnDate;
    const travelClass = req.query.travelClass;
    const children = req.query.children;
    const infants = req.query.infants;
    const max = req.query.max;

    const flights = await searchFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      travelClass,
      children,
      infants,
      max,
    });

    console.log('amadeus data', flights);
    res.json(flights);
  } catch (error) {
    console.error('An error occurred while searching flights:', error);
    next(error);
  }
});

export default router;

// import express from 'express';
// import { searchFlights } from '../controller/airport.js';
// import { v4 as uuidv4 } from 'uuid'


// const router = express.Router();



// // export default router;
// router.get('/search', async (req, res, next) => {
//   try {


//     // Retrieve the parameters from the query string
//     const originLocationCode = req.query.originLocationCode;
//     const destinationLocationCode = req.query.destinationLocationCode;
//     const departureDate = req.query.departureDate;
//     const adults = req.query.adults;
//     const returnDate = req.query.returnDate;
//     const travelClass = req.query.travelClass;
//     const children = req.query.children;
//     const infants = req.query.infants;
//     const max = req.query.max;

//     const flights = await searchFlights({
//       originLocationCode,
//       destinationLocationCode,
//       departureDate,
//       returnDate,
//       adults,
//       travelClass,
//       children,
//       infants,
//       max,
//     });

//     console.log('amadeus data', flights);
//     res.json(flights);
//   } catch (error) {
//     console.error('An error occurred while searching flights:', error);
//     next(error);
//   }
// });

// export default router;

