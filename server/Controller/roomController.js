const Room = require("../model/roomModel");
const Hotel = require("../model/hotelModel")
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");




// CREATE ROOMS
exports.createRoom = catchAsyncError(async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id }
    });

    res.status(200).json({
        message: "Room is Created!",
        savedRoom
    })
});




// UPDATE ROOMS
exports.updateRoom = catchAsyncError(async (req, res, next) => {

    const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    res.status(200).json({
        message: "Update Successful!",
        updateRoom,
    })
});




// UPDATE ROOM AVAILABILITY
exports.updateRoomAvailability = catchAsyncError(async (req, res, next) => {

    await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        }
    )
    res.status(200).json({
        messsage: "Room satus has been updated.",
    })
});






// DELETE ROOM
exports.deleteRoom = catchAsyncError(async (req, res, next) => {

    const hotelId = req.params.hotelid;

    await Room.findByIdAndDelete(req.params.id);

    await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id }
    })

    res.status(200).json({
        message: "Room has been deleted."
    })
});




// GET ROOM
exports.getRoom = catchAsyncError(async (req, res, next) => {

    const room = await Room.findById(req.params.id);

    if (!room) {
        return next(new ErrorHandler("Room not found", 401))
    }

    res.status(200).json({
        success: true,
        room,
    })
});





// GET  ALL  ROOMS
exports.getAllRooms = catchAsyncError(async (req, res, next) => {

    const countRoom = await Room.countDocuments();
    const rooms = await Room.find();


    if (!rooms) {
        return next(new ErrorHandler("Room not found", 401))
    }

    res.status(200).json({
        succcess: true,
        rooms,
        countRoom,
    })
})