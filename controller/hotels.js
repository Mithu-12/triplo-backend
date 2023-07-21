import Hotels from '../models/Hotels.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json('hotel has been deleted');
  } catch (error) {
    next(error);
  }
};
//getHotel
export const getHotel = async (req, res, next)=>{
    try {
        const hotel = await Hotels.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}


export const getAllHotel = async (req, res, next) => {
  try {
    const alleHotel = await Hotels.find();
    res.status(200).json(alleHotel);
  } catch (error) {
    next(error);
  }
};
