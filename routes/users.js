import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controller/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

TODO://this is check authentication user and admin

// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//   res.send('you are authenticated');
// });

// router.get('/checkUser/:id', verifyUser, (req, res, next)=>{
//   res.send('hello user, you are login and you can delete your account')
// })
// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next)=>{
//   res.send('hello Admin, you are login and you can delete all account')
// })

//update
router.put('/:id', verifyUser, updateUser);
//delete
router.delete('/:id',verifyUser, deleteUser);
//getUser
router.get('/:id',verifyUser, getUser);
//getAllUser
router.get('/', verifyAdmin, getAllUser);

export default router;
