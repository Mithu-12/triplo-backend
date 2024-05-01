import express from 'express';
import { searchFlights } from '../controller/airport.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

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
  };
  next();
};

router.use('/search', logFlightSearch);

router.get('/search', async (req, res, next) => {
  try {
    const sessionStartTime = req.session.createdAt;
    const sessionEndTime = req.session.sessionEndTime;
    const searchUid = req.session.searchUid;
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      returnDate,
      travelClass,
      children,
      infants,
      max
    } = req.query;
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
    res.json({ flights, sessionStartTime, sessionEndTime, searchUid });
  } catch (error) {
    console.error('An error occurred while searching flights:', error);
    next(error);
  }
});

export default router;
