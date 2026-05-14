import exp from 'express'
import { productModel } from './productModel.js'

export const productApp = exp.Router()

productApp.use(exp.json())

// create product
productApp.post("/products", async (req,res,next)=>{
  try{
    const newProduct = req.body

    const newproductDocument = new productModel(newProduct)

    const result = await newproductDocument.save()

    console.log("result:",result)

    res.status(201).json({message:"Product added into DataBase",payload:result})
  }
  catch(err){
    next(err)
  }
})


// get all products
productApp.get("/products", async(req,res,next)=>{
  try{
    const productList = await productModel.find()

    res.status(200).json({message:"products list",payload:productList})
  }
  catch(err){
    next(err)
  }
})


// get product by productId
productApp.get("/products/:id", async(req,res,next)=>{
  try{
    const pid = req.params.id

    const productobj = await productModel.findOne({productId:pid})

    if(!productobj){
      return res.status(404).json({message:"product not available"})
    }

    res.status(200).json({message:"product",payload:productobj})
  }
  catch(err){
    next(err)
  }
})


// update product by productId
productApp.put("/products/:id", async(req,res,next)=>{
  try{
    const pid = req.params.id
    const modifiedproduct = req.body

    const updatedproduct = await productModel.findOneAndUpdate(
      {productId:pid},
      {$set:{...modifiedproduct}},
      {new:true,runValidators:true}
    )

    if(!updatedproduct){
      return res.status(404).json({message:"product not found"})
    }

    res.status(200).json({message:"product is modified",payload:updatedproduct})
  }
  catch(err){
    next(err)
  }
})


// delete product by productId
productApp.delete("/products/:id", async(req,res,next)=>{
  try{
    const pid = req.params.id

    const deletedproduct = await productModel.findOneAndDelete({productId:pid})

    if(!deletedproduct){
      return res.status(404).json({message:"product not found"})
    }

    res.status(200).json({message:"product removed",payload:deletedproduct})
  }
  catch(err){
    next(err)
  }
})