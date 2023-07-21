import Flight from "../models/Flight.js";

export const createFlight = async (req, res, next) => {
  const { type, from, to, persons, date, returnTrip } = req.body;

  try {
    const newFlightOption = new Flight({
      type,
      from,
      to,
      persons,
      date,
      returnTrip,
    });

    const savedFlightOption = await newFlightOption.save();

    res.status(201).json(savedFlightOption);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a flight option' });
  }
};

export const updateFlight = async (req, res, next) => {
    try {
      const updateFlight = await Flight.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateFlight);
    } catch (error) {
      next(error);
    }
  };


  export const deleteFlight = async (req, res, next) => {
    try {
      await Flight.findByIdAndDelete(req.params.id);
      res.status(200).json('hotel has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const getFlight = async (req, res, next)=>{
    try {
        const flight = await Flight.findById(req.params.id);
        res.status(200).json(flight)
    } catch (error) {
        next(error)
    }
}

export const getAllFlight = async (req, res, next) => {
    try {
      const allFlight = await Flight.find();
      res.status(200).json(allFlight);
    } catch (error) {
      next(error);
    }
  };