const user=require('../models/model')
// Signup
const signup=async(req,res)=>{
    try{
        const {email,password}=req.body
        const users =await user.find({email:email})
        console.log(users)
        if(users==''){
        user.create({
            email,
            password
            })
            res.status(201).json({
                message:"User Created"
            })
        }
        else{
            res.status(404).json({
                message:"User already exist"
            })
        }

    
}
    catch(err){
        res.status(500)
        console.log("Error",err)
    }

}
// Login
const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const users =await user.findOne({email:email})
        if(!users){
            res.status(404).json({
                message:"User not found"
            })


        }
        else if(users.password==password){
            res.status(200).json({
                message:"User Login"
            })

        }
        else{
            res.status(404).json({
                message:"Incorrect Password "
            })
        }

       
       
        

    }catch(err){
        res.status(500)
        console.log("Error",err)

    }


}

module.exports={
    signup,
    login
}
