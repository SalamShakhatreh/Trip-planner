const Destination=require("../models/Destination");

const getDestination = async (req, res) => {
    try {
        const { search, country, page = 1, limit = 10 } = req.query;

        const filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (country) {
            filter.country = { $regex: country, $options: "i" };
        }

        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.max(1, Math.min(100, Number(limit)));
        const skip = (currentPage - 1) * pageLimit;

        const destinations = await Destination.find(filter)
            .skip(skip)
            .limit(pageLimit);

        const total = await Destination.countDocuments(filter);

        res.status(200).json({
            destinations,
            currentPage,
            totalPages: Math.ceil(total / pageLimit),
            totalDestinations: total
        });
    } catch (error) {
       return res.status(500).json({
    message: "Internal server error"
});
    }
};
const createDestination = async (req, res) => {
  try {
    const { name, country, description, image } = req.body;

    const newDestination = new Destination({
      name,
      country,
      description,
      image
    });

    await newDestination.save();

    res.status(201).json(newDestination);
  } catch (error) {
   return res.status(500).json({
    message: "Internal server error"
});
  }
};
const getDestinationById = async (req, res) => {
    try {
        const dest = await Destination.findById(req.params.id);

        if (!dest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(dest);
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
    }
};

const updateDestination = async (req, res) => {
    try {
        const updatedDest = await Destination.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(updatedDest);
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
    }
};
const deleteDestination = async (req, res) => {
    try {
        const deletedDest = await Destination.findByIdAndDelete(req.params.id);

        if (!deletedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
    }
};



module.exports={getDestination,createDestination, getDestinationById,updateDestination,deleteDestination};