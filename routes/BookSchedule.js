import express from 'express';

// import { verifyAdmin } from '../utils/verifyToken.js'
import {
  createBookSchedule,
  deleteBookSchedule,
  getAllBookSchedule,
  getBookSchedule,
  updateBookSchedule,
} from '../controller/BookSchedule.js';

const router = express.Router();

//create
router.post('/', createBookSchedule);

//update
router.put('/:id', updateBookSchedule);
//delete
router.delete('/:id', deleteBookSchedule);
//getBookSchedule
router.get('/:id', getBookSchedule);
//getAllBookSchedule
router.get('/', getAllBookSchedule);

export default router;
