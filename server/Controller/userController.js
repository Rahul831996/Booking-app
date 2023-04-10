const User = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken")
 
 




// REGISTER USER
exports.registerUser = catchAsyncError(async(req, res, next) => {

 

    const { name, email, password ,country,city,img,phone } = req.body;

    const user = await User.create({
        name, email, password,country,city,img,phone
    })


    sendToken(user, 200 , res);
     
});





 // Login user
exports.loginUser = catchAsyncError(async(req, res, next) => {

    try{
        const {email, password} = req.body;

    //checking if user given email and password both
    
    if (!email || !password) {
        return next(new ErrorHandler(" Invalid email  and password", 400));
    } 

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("user not found", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid email or password", 401))
    }

    sendToken(user, 200 , res);
   } catch(err) {
    next(err)
   }
})










// logout user

exports.logoutUser = catchAsyncError(async(req, res, next) => {

    res.cookie("token",null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success: true,
        message:"logged out",
    })
})




//  get All Users----- Admin
exports.getAllUser = catchAsyncError(async(req, res, next) => {
    try{
        const users = await User.find();

        res.status(200).json({
            success:true,
            users,
        });
        
    }catch(err){
        next(err)
    }
});


 


// delete User --- Admin
exports.deleteUser = catchAsyncError(async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`user does not exist with id:${req.params.id}`, 400))
    }

   


    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:"User Deletion Successful",
    })
})