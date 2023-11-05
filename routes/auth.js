import express from 'express';
import passport from 'passport';
import { changePassword, login, register } from '../controller/auth.js';
import generateToken from '../utils/generateToken.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();
const CLIENT_URL = 'http://localhost:5173';
const SUCCESS_URL = 'http://localhost:5173/login/success';
// const SUCCESS_URL = 'https://triplo-flights.vercel.app/login/success';

router.post('/register', register);

router.post('/login', login);
router.post('/change-password',  changePassword);

const loginUserSuccessRoute = (req, res, user) => {
  try {
    console.log(req.user)
    // Authentication succeeded, now pass the user to the /login/success route handler
    return res.redirect(`${SUCCESS_URL}?user=${JSON.stringify(user)}`);
    // return res.redirect(`${SUCCESS_URL}?user=${JSON.stringify(user)}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.post('/logout', function (req, res, next) {
  // Call the req.logout() function with a callback function
  req.logout(function (err) {
    if (err) {
      // Handle error if logout fails
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    // Redirect to the desired route after successful logout
    res.redirect('/');
  });
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', async (err, user, info) => {
    try {
      if (err) {
        throw err; // Handle the error
      }

      if (!user) {
        // Authentication failed
        return res.redirect('/failure');
      }

      // Authentication succeeded, now store the user in the session
      req.login(user, async (loginErr) => {
        if (loginErr) {
          throw loginErr; // Handle the login error
        }

        // You can also store the user data in the session
        req.session.user = user; // This will make the user data available in the session
        const sessionUser = req.session.user;
        console.log('User data in session:', sessionUser);
        
        // Redirect to a success URL or send a response
        // return res.redirect(SUCCESS_URL);
        return loginUserSuccessRoute(req, res, user);
      });
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  })(req, res, next);
});



router.get('/login/success', async (req, res) => {
  try {
    // Use the user data stored in the session
    // const sessionUser = await req.session.user;
    const sessionUser = JSON.parse(req.query.user);
console.log('user', sessionUser)
    if (!sessionUser) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Generate an access token (JWT)
    const token = generateToken(sessionUser._id);

    // Set the access token as a cookie
    res.cookie('access_token', token, { httpOnly: true });

    // Send the access token and user in the response
    res.status(200).json({
      success: true,
      message: 'success',
      access_token: token,
      user: sessionUser,
    });
  } catch (error) {
    // Handle any errors that occur during this process
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// router.get(
//   '/facebook',
//   passport.authenticate('facebook', { scope: ['email'] })
// );
// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook'),
//   (req, res) => {
//     const token = generateToken(req.user._id);
//     res.cookie('access_token', token, { httpOnly: true });
//     res.json({ user: req.user });
//   }
// );

export default router;
