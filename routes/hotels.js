import express from 'express'

import { createHotel, deleteHotel, getAllHotel, getHotel, updateHotel, } from '../controller/hotels.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

//create
router.post('/', verifyAdmin, createHotel)

//update
router.put('/:id', verifyAdmin, updateHotel)
//delete
router.delete('/:id', verifyAdmin, deleteHotel)
//getHotel
router.get('/:id', getHotel)
//getAllHotel
router.get('/', getAllHotel)

export default router;