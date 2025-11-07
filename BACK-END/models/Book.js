import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
// now we will connect the data base and have the mongoose properly set

// mongoose.connect will return a promise -> u need .then and .catch to make a proper decision accordingly
mongoose.connect(process.env.mongooseUrl).then( () => {
    console.log("The connection to the mongodb has been successful.")
} ).catch( err => {
    console.error("The connection to mongodb has been unsuccessful due to " , err.message)
})

let BookSchema = new mongoose.Schema({
    // id will be given by default
    title : String,
    author : String,
    publishedYr : Number,
    // createdAt : () => new Date.now() ,
    // // u set this to be a function bc u need to have a new date everytime there is sthg new
    // updatedAt : () => new Date.now() u dont need this bc u will be using timestamps
} , {timestamps : true})

// if u add {timestamps : true} it will add createdAt and updatedAt fields automatically 
// and the updatedAt will be updated when u call .save() manually

export default mongoose.model("books" , BookSchema);
// mongoose.model - returns the model that is created based off of the schema u provided

// then u need to have a table exported to the db manipulation
// u create a schema new mongoose.Schema - bc it is an obj
// then u export the model u created






