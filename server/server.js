const app = require("./app");
const dotenv  = require("dotenv");
const database = require("./config/database");





dotenv.config({path:"server/config/config.env"});


// Handleing Unchatch Error  Exception liek..something wrong word writen in anywhere.

process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection error");

    //calling server to exit from the below prosses will execute.
    process.exit(1);
     
});

 
// connect to database
database();

 const server = app.listen(process.env.PORT, () => {
    console.log(`srever is listing on : ${process.env.PORT}`)
})  


// unhandle promise rejection error 
process.on("unhandledRejection", () => {
    console.log(`error : ${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection error")

    // calling the server to exit from the below process will execute
    server.close(() => {
        process.exit(1)
    })
})