import express from 'express'


import { createVisa, deleteVisa, getAllVisa, getVisa, updateVisa } from '../controller/visa.js';


const router = express.Router()

//create
router.post('/', createVisa)

//update
router.put('/:id',  updateVisa)
//delete
router.delete('/:id',  deleteVisa)
//getHotel
router.get('/:id', getVisa)
//getAllHotel
router.get('/', getAllVisa)

export default router;