import express from "express";
const app = express();
import profileRoute from "./routes/profileRoute.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

connectDB();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use(express.json())

app.use('/api',profileRoute)
// app.use('/api/profile',)


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})