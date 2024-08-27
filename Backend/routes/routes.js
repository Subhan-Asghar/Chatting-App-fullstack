const express = require('express')
const router =express.Router();
const chat =require('../models/model.js')
router.route('/')
.get((req,res)=>{
    res.status(200).json({
        message:"Done"
    })
})
.post(async(req,res)=>{
    try{
        const {email,password}=req.body
        const user =await chat.find({email:email})
        if(user!=[]){
        chat.create({
            email,
            password
            })
        }
        else{
            console.log("User alredy Exist")
        }

    
}
    catch(err){
        res.status(400)
        console.log("Error",err)
    }
   
})
module.exports=router