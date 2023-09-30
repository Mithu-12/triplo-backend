import express from 'express';
import {
  addTravelers,
  deleteTraveler,
  getAllTravelersByUserId,
  // updateTraveler,
} from '../controller/traveler.js';

const router = express.Router();

router.post('/', addTravelers);

// router.put('/:id', updateTraveler);

router.delete('/:id', deleteTraveler);

router.get('/:userId', getAllTravelersByUserId)


export default router;
