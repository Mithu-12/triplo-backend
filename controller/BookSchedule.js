import BookSchedule from "../models/BookSchedule.js";


export const createBookSchedule = async (req, res, next) => {
  const newBookSchedule = new BookSchedule(req.body);
  try {
    const saveBookSchedule = await newBookSchedule.save();
    res.status(200).json(saveBookSchedule);
  } catch (error) {
    next(error);
  }
};
export const updateBookSchedule = async (req, res, next) => {
  try {
    const updateBookSchedule = await BookSchedule.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateBookSchedule);
  } catch (error) {
    next(error);
  }
};
export const deleteBookSchedule = async (req, res, next) => {
  try {
    await BookSchedule.findByIdAndDelete(req.params.id);
    res.status(200).json('BookSchedule has been deleted');
  } catch (error) {
    next(error);
  }
};
//getBookSchedule
export const getBookSchedule = async (req, res, next)=>{
    try {
        const bookSchedule = await BookSchedule.findById(req.params.id);
        res.status(200).json(bookSchedule)
    } catch (error) {
        next(error)
    }
}


export const getAllBookSchedule = async (req, res, next) => {
  try {
    const alleBookSchedule = await BookSchedule.find();
    res.status(200).json(alleBookSchedule);
  } catch (error) {
    next(error);
  }
};
