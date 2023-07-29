import Visa from "../models/Visa.js";


export const createVisa = async (req, res, next) => {
  const newVisa = new Visa(req.body);
  try {
    const saveVisa = await newVisa.save();
    res.status(200).json(saveVisa);
  } catch (error) {
    next(error);
  }
};
export const updateVisa = async (req, res, next) => {
  try {
    const updateVisa = await Visa.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateVisa);
  } catch (error) {
    next(error);
  }
};
export const deleteVisa = async (req, res, next) => {
  try {
    await Visa.findByIdAndDelete(req.params.id);
    res.status(200).json('Visa has been deleted');
  } catch (error) {
    next(error);
  }
};
//getVisa
export const getVisa = async (req, res, next)=>{
  try {
      const visaData = await Visa.findById(req.params.id);
      res.status(200).json(visaData)
  } catch (error) {
      next(error)
  }
}

export const getAllVisa = async (req, res, next) => {
  try {
    const allVisa = await Visa.find();
    res.status(200).json(allVisa);
  } catch (error) {
    next(error);
  }
};

