const express = require("express");
const {registerUser,loginUser, logoutUser, getAllUser, deleteUser} = require("../Controller/userController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/authenticate")


const router = express.Router();

 
// Resiter user
router.route("/register/user").post(registerUser)

// // Login User
router.route("/login/user").post(loginUser);

// logout user
router.route("/logout/user").get(logoutUser)


router
  .route("/admin/users")
  .get(isAuthenticatedUser,authorizeRoles ("admin"), getAllUser);

// get single user -- Admin
router.route("/admin/user/:id")
     .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)



module.exports = router