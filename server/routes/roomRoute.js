const express = require("express");
const { createRoom, deleteRoom, updateRoom,updateRoomAvailability, getAllRooms, getRoom } = require("../Controller/roomController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authenticate");



const router = express.Router();

// CREATE
router.route("/room/:hotelid").post(isAuthenticatedUser, authorizeRoles("admin"), createRoom)



// UPDATE
router.route("/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateRoom);

router.route("/availability/:id").put(updateRoomAvailability)



// DELETE
router.route("/:id/:hotelid").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRoom);



// GET
router.route("/room/:id").get(getRoom);


// GET ALL
router.route("/all/rooms").get(getAllRooms);







module.exports = router;