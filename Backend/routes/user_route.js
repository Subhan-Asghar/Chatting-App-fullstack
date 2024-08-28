const express = require('express')
const user=require('../models/user')
const router=express.Router()
router.post('/register',(req,res)=>{
    const {name,email,password}=req.body
    const data=user.findOne({email})
    if(data==''){
        user.create({
            name,
            email,
            password
        })
        res.status(201).json({
            message:"User Created"
        })
    }
    else{
        res.status(404).json({
            message:"User Already Exist"
        })
    }

})


router.post('/login',(req,res)=>{
    const {name,email,password}=req.body
    const data=user.findOne({email})
   
     if(data==''){
        res.status(404).json({
            message:"User Don't  Exist"
        })
    }
    else if(data.password==password){

        res.status(200).json({
            message:"User Login",
            name:name

        })
    }
    else{
        res.status(404).json({
            message:"Incorrect Password"
        })
    }

})

module.exports=router