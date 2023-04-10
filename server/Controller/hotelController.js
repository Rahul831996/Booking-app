const Hotel = require("../model/hotelModel");
const Room = require("../model/roomModel")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")

// CREATE  HOTEL
exports.createHotel = catchAsyncError(async (req, res) => {

    const newHotel = new Hotel(req.body)

    const hotel = await newHotel.save()

    res.status(200).json({
        message: "hotel creation successful",
        hotel
    })
});


// UPDATE HOTEL
exports.updateHotels = catchAsyncError(async (req, res, next) => {

    const updateHotels = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

    if (!updateHotels) {
        return next(new ErrorHandler("update hotel not found", 400))
    }
    res.status(200).json({
        message: "update successful",
        updateHotels,
    })
});


// DELETE HOTEL
exports.deleteHotel = catchAsyncError(async (req, res, next) => {

    await Hotel.findByIdAndDelete(req.params.id)

    if (!Hotel) {
        return next(new ErrorHandler("hotel not deleted", 400))
    }

    res.status(200).json({
        message: "Hotel has beeen deleted !"
    })

});



// GET SINGLE HOTEL
exports.getSingleHotel = catchAsyncError(async (req, res, next) => {

    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
        return next(new ErrorHandler("faild to get, Wrong info entered", 401))
    }
    res.status(200).json({
        success: true,
        hotel
    })
});


// GET ALL HOTELS
exports.getAllHotels = catchAsyncError(async (req, res, next) => {
    const {min, max, ...others } = req.query;

    try{
        const hotels = await Hotel.find({
                    ...others,
                    cheapestPrice: { $gt: min | 1, $lt: max || 1000000 },
                  }).limit(req.query.limit);
                  res.status(200).json(hotels);
    }catch(err) {
        next(err);
    }
});


 


// GET HOTELS BY CITY
exports.countByCity = catchAsyncError(async (req, res, next) => {

    const cities = req.query.cities.split(",");

    const list = await Promise.all(cities.map(city => {
        return Hotel.countDocuments({ city: city })
    }))


    res.status(200).json({
        success: true,
        list,
    })
});




// GET HOTELS BY TYPE
exports.countByType = catchAsyncError(async (req, res, next) => {

    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "aprtment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });


    res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "aprtment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount },
    ])
});



//GET HOTEL ROOMS 
exports.getHotelRooms = catchAsyncError(async(req, res, next) => {

     
    try{
        const hotel = await Hotel.findById(req.params.id);
    
    const list = await Promise.all(
        hotel.rooms.map((room) => {
            return Room.findById(room);
        })
    )

    res.status(200).json({
        list
    })

  }catch(err) {
    next(err)
  }
})