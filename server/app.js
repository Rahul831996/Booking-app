const express  = require("express");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressFile = require("express-fileupload")
const cors = require("cors")
const path = require("path")

// config
require("dotenv").config({path:"server/config/config.env"})


app.use(express.json({limit:"50mb"}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressFile());
app.use(cors());

 


// api exports


const Hotel = require("./routes/hotelRoute");
const user = require("./routes/userRoute");
const room = require("./routes/roomRoute")

app.use("/api/v1",Hotel);
app.use("/api/v1",user);
app.use("/api/v1",room);
 

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => { 
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });


app.use(errorMiddleware);

module.exports = app