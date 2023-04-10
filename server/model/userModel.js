const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        select:false,
    },
    img: {
        type:String,  
    },
    role: {
        type:String,
        default:"User",
    },



},{timestamps: true});




// password to covert in hash
userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcryptjs.hash(this.password, 8);
})

//JWT Token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// comparePassword
userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

 


module.exports = mongoose.model("User",userSchema)