import express from "express";
import dotenv from "dotenv";
import Books from "./models/Book.js";
import mongoose from "mongoose";

dotenv.config();


const app = express();
// console.log(process.env.PORT)

app.use(express.json()) // this will make the incoming json change to js object so req.json is an obj
// it will look at the incoming req and then change the body to json to make it easier for u to get


app.get('/book' , async (req , res) => {
    try{
        // call a mongoose function to return the array of book info
        const BookInfos = await Books.find();
        console.log("BookInfos are fetched successfully" , BookInfos);

        res.status(200).json(BookInfos);

        // res.json() - will convert the whole BookInfos into json and send it to the front end
    } catch (err) {
        console.log("error happened while doing a get request".toUpperCase() , err.message);
        res.sendStatus(404)
    }
    
})


app.post('/book' , async (req , res) => {
    try{
        // when the req comes it is parsed and req.body is JSON
        // front end sends the info - {title , author , publishedYr}

        const {title , author , publishedYr} = req.body;

        const user = await Books.create({
            title ,
            author,
            publishedYr
        })

        res.sendStatus(201) // 201 is a status for when a resource is successfully created

        console.log("Book successfully created " , user)
    } catch (err) {
        console.log("error happened while doing a post request".toUpperCase() , err.message);
        res.sendStatus(404);
    
    }
    

})

app.get('/book/:id' , async (req , res) => {
    try{
        // return the whole info
        // to get the id u have to say req.params = obj of the {'id' : 12345}

        let {id} = req.params;
        // then find the user with the id

        // then u need to use the mongoose Id not a string to do the comparison

        let MongooseId = new mongoose.Types.ObjectId(id)
        let bookFound = await Books.findById( MongooseId  );
        // console.log(id , MongooseId , bookFound)

        if (!bookFound){
            throw new Error("The book is not in the database");
        }
        else{
            res.sendStatus(200).json(bookFound);
        }

        console.log("Book with id of " + id + " is found " , bookFound);

    } catch (err) {
        console.log("error happened while doing a get request for a single user".toUpperCase() , err.message);
        res.sendStatus(404);
    }
    
})

app.put('/book/:id' , async (req , res) => {
    try{
        // then u will find and update
        // front end sent info {id , title , author , publishedYr}

        const { id } = req.params;
        // the params will have the id
        let mongooseId = new mongoose.Types.ObjectId(id)

        const { title , author , publishedYr} = req.body;

        // then find the book
        let bookToBeUpdated = await Books.findById(mongooseId);

        bookToBeUpdated.title = title,
        bookToBeUpdated.author = author,
        bookToBeUpdated.publishedYr = publishedYr,

        await bookToBeUpdated.save();
        // this will update both the book information and updatedAt

        console.log("The book information has been successfully updated. " , bookToBeUpdated);

        res.sendStatus(200); // the book is successfully updated
    } catch (err) {
        console.log("error happened while doing a put request for a single user".toUpperCase() , err.message);
        res.sendStatus(404);
    }
    
})

app.delete('/book/:id' , async (req , res) => {
    try{
        // u will delete a user
        // frontend sent info just send the id only 
        
        const { id } = req.params;
        let mongooseId = new mongoose.Types.ObjectId(id);

        let bookDeleted = await Books.deleteOne({ _id : mongooseId })

        console.log("Book successfully deleted " , bookDeleted);

        // 204 status means the book is deleted successfully
        // 201 means the book is created properly
        res.sendStatus(204)
    } catch (err) {
        console.log("error happened while doing a delete request for a single user".toUpperCase() , err.message);
        res.sendStatus(404);
    }
    
 
})


let fallBackMiddleware = function (req , res ) {
    // this runs if there is a route that is unmatched by any route from the ones u set
    res.sendStatus(404).json({ message : "The route you searched is not found"})
}

app.use(fallBackMiddleware);

// this needs to be at last bc it is a post middleware


app.listen(process.env.PORT || 3000 , () => {
    console.log('Server is up and running on ' + process.env.PORT)
})



