const express = require('express')
const user=require('../models/user')
const router=express.Router()
router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    const result= await user.findOne({email})
    if(result==null){
        await user.create({
            name,
            email,
            password
        })
        res.status(201).json({
            message:"User Created"
        })
    }
    else{
        res.status(401).json({
            message:"User Already Exist"
        })
    }

})


router.post('/login',async(req,res)=>{
    const {name,email,password}=req.body
    const result=await user.findOne({email})
     if(!result){
        res.status(401).json({
            message:"User Don't  Exist"
        })
    }
    else if(result.password==password){

        res.status(200).json({
            message:"User Login",
            name:name

        })
    }
    else{
        res.status(401).json({
            message:"Incorrect Password"
        })
    }

})

module.exports=router