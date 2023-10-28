// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// // import { Strategy as FacebookStrategy } from 'passport-facebook';
// import User from '../models/User.js';



// passport.use(
//   new GoogleStrategy(
//     {
//       // Google OAuth2 credentials
//       clientID: process.env.GOOGLE_CLIENT_API_KEY,
//       clientSecret: process.env.GOOGLE_SECRET_API_KEY,
//       callbackURL: 'https://triplo-flight.onrender.com/api/auth/google/callback',
      
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       console.log('Google OAuth2 strategy called');
//       try {
//         // Check if the user already exists in database
//         let user = await User.findOne({ googleId: profile.id });
//         // console.log(profile);
//         if (!user) {
//           // Create a new user if not found
//           user = await User.create({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             picture: profile.photos[0].value,
//             userName: profile.emails[0].value,
//           });
//         }
       

//         // Call done with null for the error and the user object
//         return done(null, user);
//       } catch (error) {
//         // Call done with the error object and false for the user
//         console.log('new error', error)
//         return done(error, false);
//       }
//     }
//   )
// );

// // Facebook OAuth2.0 strategy
// // passport.use(
// //   new FacebookStrategy(
// //     {
// //       clientID: process.env.FACEBOOK_CLIENT_API_KEY,
// //       clientSecret: process.env.FACEBOOK_SECRET_API_KEY,
// //       callbackURL: 'https://triplo-flight.onrender.com/api/auth/facebook/callback',
// //     },
// //     async (accessToken, refreshToken, profile, done) => {
// //       try {
// //         // Add logic to find or create user with Facebook profile information
// //         const user = await User.findOne({ facebookId: profile.id });
// //         if (!user) {
// //           const newUser = new User({
// //             facebookId: profile.id,
// //             email: profile.emails[0].value,
// //           });
// //           await newUser.save();
// //           return done(null, newUser);
// //         }
// //         return done(null, user);
// //       } catch (error) {
// //         return done(error);
// //       }
// //     }
// //   )
// // );



// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });



// // passport.serializeUser(function (user, done) {
// //   done(null, user.id);
// // });

// // passport.deserializeUser(function (id, done) {
// //   // Find the user by ID and call done(null, user) if found
// //   User.findById(id, function (err, user) {
// //     done(err, user);
// //   });
// // });










