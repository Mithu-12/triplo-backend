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


// router.get('/login/success', async (req, res) => {
//   try {
//     // Use the user data stored in the session
//     const sessionUser = await req.session;
// console.log('userEmail', sessionUser)
//     // if (!sessionUser) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: 'Unauthorized',
//     //   });
//     // }

//     // Generate an access token (JWT)
//     const token = generateToken(sessionUser._id);

//     // Set the access token as a cookie
//     res.cookie('access_token', token, { httpOnly: true });

//     // Send the access token and user in the response
//     res.status(200).json({
//       success: true,
//       message: 'success',
//       access_token: token,
//       user: sessionUser,
//     });
//   } catch (error) {
//     // Handle any errors that occur during this process
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// });


router.get('/failure', (req, res) => {
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

// router.get('/google/callback', (req, res, next) => {
//   passport.authenticate('google', async (err, user, info) => {
//     try {
//       if (err) {
//         throw err; // Handle the error
//       }

//       if (!user) {
//         // Authentication failed
//         return res.redirect('/failure');
//       }
// console.log('userId', user)
//       // Authentication succeeded, now store the user in the session
//       req.login(user, async (loginErr) => {
//         if (loginErr) {
//           throw loginErr; // Handle the login error
//         }

//         // You can also store the user data in the session
//         req.session.user = user; 
//         console.log('user',req.session.user)
//         if(req.session.user){

//           return res.redirect(SUCCESS_URL);
//         }

//         // Redirect to a success URL or send a response
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       res
//         .status(500)
//         .json({ success: false, message: 'Internal server error' });
//     }
//   })(req, res, next);
// });

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: 'api/auth/login/success',
    failureRedirect: '/login/failed',
  })
);



router.get('/login/success', async (req, res) => {
  try {
    // After the user is authenticated (e.g., via Passport), store user data in the session
    const user = req.user; // Assuming Passport has stored the user in req.user
console.log('firstUser', user)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Store the user data in the session
    req.session.user = user;
console.log('sessionUser', req.session.user)
    // Generate an access token (JWT)
    const token = generateToken(user._id);

    // Set the access token as a cookie
    res.cookie('access_token', token, { httpOnly: true });

    // Send the access token and user in the response
    res.status(200).json({
      success: true,
      message: 'success',
      access_token: token,
      user,
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









// import express from 'express';
// import passport from 'passport';
// import { changePassword, login, register } from '../controller/auth.js';
// import generateToken from '../utils/generateToken.js';
// import { verifyToken, verifyUser } from '../utils/verifyToken.js';
// const router = express.Router();
// const CLIENT_URL = 'http://localhost:5173';
// // const SUCCESS_URL = 'http://localhost:5173/login/success';
// const SUCCESS_URL = 'https://triplo-flights.vercel.app/login/success';

// router.post('/register', register);

// router.post('/login', login);
// router.post('/change-password',  changePassword);


// router.get('/login/success', async (req, res) => {
//   try {
//     // Use the user data stored in the session
//     const sessionUser = await req.user;
// console.log('user', sessionUser)
//     // if (!sessionUser) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: 'Unauthorized',
//     //   });
//     // }

//     // Generate an access token (JWT)
//     const token = generateToken(sessionUser._id);

//     // Set the access token as a cookie
//     res.cookie('access_token', token, { httpOnly: true });

//     // Send the access token and user in the response
//     res.status(200).json({
//       success: true,
//       message: 'success',
//       access_token: token,
//       user: sessionUser,
//     });
//   } catch (error) {
//     // Handle any errors that occur during this process
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// });

// router.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: 'failure',
//   });
// });

// router.post('/logout', function (req, res, next) {
//   // Call the req.logout() function with a callback function
//   req.logout(function (err) {
//     if (err) {
//       // Handle error if logout fails
//       console.error('Logout error:', err);
//       return res.status(500).json({ message: 'Logout failed' });
//     }

//     // Redirect to the desired route after successful logout
//     res.redirect('/');
//   });
// });

// router.get(
//   '/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google/callback', (req, res, next) => {
//   passport.authenticate('google', async (err, user, info) => {
//     try {
//       if (err) {
//         throw err; // Handle the error
//       }

//       if (!user) {
//         // Authentication failed
//         return res.redirect('/failure');
//       }

//       // Authentication succeeded, now store the user in the session
//       req.login(user, async (loginErr) => {
//         if (loginErr) {
//           throw loginErr; // Handle the login error
//         }

//         // You can also store the user data in the session
//         req.session.user = user; 
//         console.log('user',req.session.user)
//         if(req.session.user){

//           return res.redirect(SUCCESS_URL);
//         }

//         // Redirect to a success URL or send a response
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       res
//         .status(500)
//         .json({ success: false, message: 'Internal server error' });
//     }
//   })(req, res, next);
// });


// // router.get(
// //   '/facebook',
// //   passport.authenticate('facebook', { scope: ['email'] })
// // );
// // router.get(
// //   '/facebook/callback',
// //   passport.authenticate('facebook'),
// //   (req, res) => {
// //     const token = generateToken(req.user._id);
// //     res.cookie('access_token', token, { httpOnly: true });
// //     res.json({ user: req.user });
// //   }
// // );

// export default router;
