
import jwt from 'jsonwebtoken';

// Function to generate a JWT token
const generateToken = (userData) => {
  const payload = {
    id: userData._id, 
  };

  const options = {
    expiresIn: '1d', 
  };

  // Sign the token with your JWT secret
  const token = jwt.sign(payload, process.env.JWT, options);
  console.log(token)
  return token;
};

export default generateToken;
