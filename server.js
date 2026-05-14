import exp from "express";
import { connect } from "mongoose";
import { productApp } from "./productApi.js";

const app=exp();

app.use("/product-api",productApp);

const port=4000;

app.listen(port,()=>console.log("server started on port 4000"));

async function connectDB(){
    await connect("mongodb://localhost:27017/merndb2")
    console.log("DB connection success")
}

connectDB();


//error middleware
app.use((err,req,res,next)=>{

 if(err.name==="ValidationError"){
   return res.status(400).json({message:"validation error",err})
 }

 if(err.name==="CastError"){
   return res.status(400).json({message:"invalid id",err})
 }

 res.status(500).json({message:"server error"})
});

