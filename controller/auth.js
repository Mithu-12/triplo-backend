import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send('user created has been successfully');
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({userName : req.body.userName})
    if(!user) return next(createError(404, "user not found"))
    const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect) next(createError(401, 'User bad request'))
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

    const {password, isAdmin, ...otherDetails} = user._doc
    res.cookie("access_token", token, {
        httpOnly: true
    } ).status(200).json({...otherDetails})
  } catch (error) {
    next(error);
  }
};
