import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controller/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//update
router.put('/:id',  updateUser);
//delete
router.delete('/:id', verifyToken, verifyUser, deleteUser);
//getUser
router.get('/:id', verifyToken, verifyUser, getUser);
//getAllUser
router.get('/', getAllUser);

export default router;
