const Destination=require("../models/Destination");

const getDestination=async(req,res)=>{
    try{
        const dest=await Destination.find();
        res.status(200).json(dest);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};

const createDestination=async(req,res)=>{
    try{
        const newDest=await Destination.create(req.body);
        res.status(201).json(newDest);
    }
    catch(error){
        res.status(500).json({message: error.message});
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
        res.status(500).json({ message: error.message });
    }
};




module.exports={getDestination,createDestination, getDestinationById};