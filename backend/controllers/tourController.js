import Tour from "../models/Tour.js";

// Create a new Tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Successfully Created",
            data: savedTour,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to create",
            error: err.message,  // Include the error message in the response
        });
    }
};

export const updateTour = async (req, res) => {
    const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json({
            success: true,
            message: "Successfully Updated",
            data: updatedTour,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Created",
        });
    }
}

export const deleteTour = async (req, res) => {
    const id = req.params.id
    try {
        await Tour.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Delete",
        });
    }
}

export const getSingleTour = async (req, res) => {
    const id = req.params.id
    try {
        const tour = await Tour.findById(id)
        res.status(200).json({
            success: true,
            message: "Successfully",
            data: tour,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    try {
        const tours = await Tour.find({})
            .skip(page * 2)
            .limit(2);

        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successfull",
            data: tours,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getTourBySearch = async (req, res) => {
    const country = new RegExp(req.query.country, "i") //i means case sensitive
    // const date = parseInt(req.query.date)
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        const tours = await Tour.find({
            country,
            // date: {$gte: date},
            maxGroupSize: { $gte: maxGroupSize }
        })
        res.status(200).json({
            success: true,
            count: tours.length,
            message: "Successfull",
            data: tours,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({featured: true})

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: tours,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
}

export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Successfull",
            data: tourCount,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed To Fetch",
        });
    }
}