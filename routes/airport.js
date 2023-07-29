
import express from 'express';
import { searchFlights } from '../controller/airport.js';

const router = express.Router();

// export default router;
router.get('/search', async (req, res, next) => {
  try {
    // Retrieve the parameters from the query string
    const originLocationCode = req.query.originLocationCode;
    const destinationLocationCode = req.query.destinationLocationCode;
    const departureDate = req.query.departureDate;
    const adults = req.query.adults;
    const returnDate = req.query.returnDate;
    const travelClass = req.query.travelClass;
    const children = req.query.children;
    const infants = req.query.infants;
    const max = req.query.max

    const flights = await searchFlights({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,

      travelClass,
      children,
      infants,
      max
      // ... other relevant parameters

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
// import NodeCache from 'node-cache';

// const router = express.Router();

// const cache = new NodeCache();
// // Flight search route
// router.get('/search', async (req, res, next) => {
//   try {
//     const cacheKey =
//       'flight-search:' + req.query.origin + req.query.destination;

//     // Check if the data exists in the cache
//     const cachedData = cache.get(cacheKey);

//     if (cachedData) {
//       console.log('its from cache');
//       // Data found in cache, return the cached data
//       res.json(cachedData);
//     } else {
//       const originLocationCode = req.query.originLocationCode;
//     const destinationLocationCode = req.query.destinationLocationCode;
//     const departureDate = req.query.departureDate;
//     const adults = req.query.adults;
//     const returnDate = req.query.returnDate;
//     const travelClass = req.query.travelClass;
//     const children = req.query.children;
//     const infants = req.query.infants;
//     const max = req.query.max
//       // Data not found in cache, fetch from the data source
//       const flights = await searchFlights({
//         originLocationCode,
//         destinationLocationCode,
//         departureDate,
//         returnDate,
//         adults,
//         travelClass,
//         children,
//         infants,
//         max,
//       }); // Fetch flights data

//       // Store the fetched data in the cache with an expiration time of 1 hour (3600 seconds)
//       cache.set(cacheKey, flights, 3600);

//       console.log('its from api');
//       // Return the fetched data as the API response
//       res.json(flights);
//     }
//   } catch (error) {
//     console.error('An error occurred while searching flights:', error);
//     next(error); // Pass the error to the next error handling middleware
//   }
// });

// export default router;
