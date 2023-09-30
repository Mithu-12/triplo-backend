import Traveler from '../models/Traveler.js';
import User from '../models/User.js';

export const addTravelers = async (req, res, next) => {
  try {
    const { userId, travelerId } = req.body;

    // Check if a traveler with the given travelerId exists in the database
    const existingTraveler = await Traveler.findOne({ travelerId });

    if (existingTraveler) {
      // Traveler with the given travelerId already exists, update the existing traveler
      const updateTraveler = await Traveler.findOneAndUpdate(
        { travelerId },
        req.body,
        { new: true }
      );
      res.json(updateTraveler);
    } else {
      // Traveler with the given travelerId does not exist, create a new traveler
      const newTraveler = new Traveler({ ...req.body, travelerId });

      await newTraveler.save();

      await User.findByIdAndUpdate(userId, {
        $push: { travelers: newTraveler.travelerId },
      });

      res.status(201).json(newTraveler);
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: 'serverError' });
  }
};

// export const updateTraveler = async (req, res, next) => {
//   try {
//     const updateTraveler = await Traveler.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updateTraveler);
//   } catch (error) {
//     console.log(error);
//     res.status(501).json({ message: 'user not updated' });
//   }
// };

export const deleteTraveler = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deleteTraveler = await Traveler.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(deleteTraveler.userId, {
      $pull: { travelers: deleteTraveler._id },
    });
    res.json(deleteTraveler);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: 'user not deleted' });
  }
};

export const getAllTravelersByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log('userId',userId)
    const travelers = await Traveler.find({ userId: userId });
    console.log('traveler',travelers)
    res.json(travelers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
