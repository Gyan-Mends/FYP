import mongoose from "mongoose";

//connecting to the database 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/helpdesk");

//creating a new instance of the database connection
const db = mongoose.connection;

try {
    //checking if the database is connected successful
    db.once("open", () =>  {
        console.log("db connected successful");
    })
} catch (error) {
    db.on("error", () => {
        console.log("Unable to connect to the database");
        
    })
}

export default mongoose