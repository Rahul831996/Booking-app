const express = require("express");
const { createHotel, updateHotels, deleteHotel, getSingleHotel, getAllHotels, countByCity, countByType, getHotelRooms } = require("../Controller/hotelController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/authenticate");



const router = express.Router();

// CREATE
router.route("/hotel").post(isAuthenticatedUser,authorizeRoles("admin") , createHotel)



// UPDATE
router.route("/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateHotels);



// DELETE
router.route("/admin/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteHotel);



// GET
router.route("/find/:id").get(getSingleHotel);


// GET ALL
router.route("/all/hotels").get(getAllHotels);

router.route("/city/countByCity").get(countByCity);

router.route("/type/countByType").get(countByType);

router.route("/hotel/room/:id").get(getHotelRooms);







module.exports = router;