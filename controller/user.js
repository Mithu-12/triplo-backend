import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updateUser,
    });;
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};
//getUser
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const alleUser = await User.find();
    res.status(200).json(alleUser);
  } catch (error) {
    next(error);
  }
};
