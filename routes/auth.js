import express from 'express';
import passport from 'passport';
import { login, register } from '../controller/auth.js';
import generateToken from '../utils/generateToken.js';
const router = express.Router();
const CLIENT_URL = 'http://localhost:5173';
const SUCCESS_URL = 'http://localhost:5173/login/success';

router.post('/register', register);

router.post('/login', login);

// Local email/password login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     // Generate JWT token and send it as a response
//     const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1d' });
//     res.cookie('access_token', token, { httpOnly: true });
//     res.json({ user });
//   })(req, res, next);
// });

router.get('/login/success', (req, res) => {
  // Use the user data stored in the session
  const sessionUser = req.session.user;
  if (sessionUser) {
    // Generate an access token (JWT)
    const token = generateToken(sessionUser._id);

    // Set the access token as a cookie
    res.cookie('access_token', token, { httpOnly: true });

    // Send the access token and user in the response
    res.status(200).json({
      success: true,
      message: 'success',
      access_token: token,
      user: sessionUser, // Use the stored sessionUser
    });
  } else {
    // If sessionUser is not available, send an error response
    res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.post('/logout', function(req, res, next) {
  // Call the req.logout() function with a callback function
  req.logout(function(err) {
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

      // Authentication succeeded, now store the user in session
      req.login(user, async (loginErr) => {
        if (loginErr) {
          throw loginErr; // Handle the login error
        }
        req.session.user = req.user;
        // return res.redirect(SUCCESS_URL)
        return res.redirect(SUCCESS_URL);
      });
    } catch (error) {
      console.error('Error:', error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  })(req, res, next);
});

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: CLIENT_URL,
//     failureRedirect: '/login',
//   }),
//   (req, res) => {
//     // Generate JWT token and send it as a response
//     req.session.user = req.user;
//     // const token = jwt.sign({ id: req.user._id }, process.env.JWT, {
//     //   expiresIn: '1d',
//     // });
//     // res.cookie('access_token', token, { httpOnly: true });
//     // res.json({ 'access_token': token, user: req.user });
//     // res.redirect('/');
//   }
// );

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    // Generate JWT token and send it as a response
    const token = generateToken(req.user._id);
    res.cookie('access_token', token, { httpOnly: true });
    res.json({ user: req.user });
  }
);

export default router;
