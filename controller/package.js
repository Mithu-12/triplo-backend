import Package from "../models/Package.js";


export const createPackage = async (req, res, next) => {
  const newPackage = new Package(req.body);
  try {
    const savePackage = await newPackage.save();
    res.status(200).json(savePackage);
  } catch (error) {
    next(error);
  }
};
export const updatePackage = async (req, res, next) => {
  try {
    const updatePackage = await Package.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePackage);
  } catch (error) {
    next(error);
  }
};
export const deletePackage = async (req, res, next) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.status(200).json('Package has been deleted');
  } catch (error) {
    next(error);
  }
};
//getPackage
export const getPackage = async (req, res, next)=>{
  try {
      const PackageData = await Package.findById(req.params.id);
      res.status(200).json(PackageData)
  } catch (error) {
      next(error)
  }
}

export const getAllPackage = async (req, res, next) => {
  try {
    const allPackages = await Package.find();
    res.status(200).json(allPackages);
  } catch (error) {
    next(error);
  }
};

export const searchPackage = async (req, res, next) => {
    try {
        const cityName = req.params.city;
    
        // Search for packages that match the provided city name
        const packages = await Package.find({ name: { $regex: cityName, $options: 'i' } });
    
        res.json(packages); // Return the matching packages as a JSON response
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for packages.' });
      }
  }
