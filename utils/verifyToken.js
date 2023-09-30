import jwt from 'jsonwebtoken';
import { createError } from './error.js';



export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('Received Token:', token);
  if (!token) {
    return next(createError(401, 'you are not authenticate'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token not authenticated'));
    req.user = user;
    next();
  });
 
};

export const verifyUser = (req, res, next)=>{
  verifyToken(req, res, next, ()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next()
    }else{
      next(createError('403', 'You are not authenticated'))
    }
    
  })
}
export const verifyAdmin = (req, res, next)=>{
  verifyToken(req, res, next, ()=>{
    if(req.user.isAdmin){
      next()
    }else{
      next(createError('403', 'You are not authenticated'))
    }
    
  })
}

