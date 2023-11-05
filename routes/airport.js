import express from 'express';
import { searchFlights } from '../controller/airport.js';
import { v4 as uuidv4 } from 'uuid';
import winston from 'winston';

const router = express.Router();

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

const logFlightSearch = (req, res, next) => {
  const searchUid = uuidv4();
  req.session.searchUid = searchUid;
  const searchParameters = {
    originLocationCode: req.query.originLocationCode,
    destinationLocationCode: req.query.destinationLocationCode,
    departureDate: req.query.departureDate,
    adults: req.query.adults,
    returnDate: req.query.returnDate,
    travelClass: req.query.travelClass,
    children: req.query.children,
    infants: req.query.infants,
    max: req.query.max,
    // Capture other search parameters as needed
  };
  const timestamp = new Date().toISOString();
  logger.info('Flight Search Log:', { searchUid, searchParameters, timestamp });
  // Log this data to your logging service
  // You can replace this with your actual logging mechanism
  console.log('Flight Search Log:', { searchUid, searchParameters, timestamp });

  next();
};

// Use the logFlightSearch middleware before your flight search route
router.use('/search', logFlightSearch);

router.get('/search', async (req, res, next) => {
  try {
    // Use the sessionStartTime if available
    const sessionStartTime = req.session.createdAt;
    const sessionEndTime = req.session.sessionEndTime;

    const searchUid = req.session.searchUid;

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

    logger.info('Flight Search Data', {
      searchUid,
      sessionStartTime,
      sessionEndTime,
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      returnDate,
      travelClass,
      children,
      infants,
      max,
    });

    console.log('Amadeus data', flights);
    
    
    // Send the sessionStartTime and sessionEndTime to the frontend
    res.json({ flights, sessionStartTime, sessionEndTime, searchUid });
  } catch (error) {
    console.error('An error occurred while searching flights:', error);
    next(error);
  }
});

export default router;

