import express from "express";
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use(express.json())

app.use('/api/profile',)


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})