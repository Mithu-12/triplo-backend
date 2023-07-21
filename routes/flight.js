import express from 'express'


import { createFlight, deleteFlight, getAllFlight, getFlight, updateFlight } from '../controller/flight.js';


const router = express.Router()

//create
router.post('/', createFlight)

//update
router.put('/:id',  updateFlight)
//delete
router.delete('/:id',  deleteFlight)
//getHotel
router.get('/:id', getFlight)
//getAllHotel
router.get('/', getAllFlight)

export default router;