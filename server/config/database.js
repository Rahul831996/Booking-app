const mongoose = require("mongoose");
const dotenv = require("dotenv")
// mongoose is used to connect server to database
dotenv.config({path:"backend/config/config.env"});

const database = () => {

    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((data) => {
        console.log(`mongoDB is Connected with : ${data.connection.host}`);
    }).catch((error) => {
        console.log(error,"mongodb is faild to connecte")
    })
} 



module.exports = database;  