import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup=async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password ){
return res.json({success:false,message:"Fields need to be required"})
    }
try {
let existingUser=await userModel.findOne({email});

if(existingUser){
    return res.json({success:false,message:"User already existed"})
};

const hashedPassword=await bcrypt.hash(password,10);
const user=new userModel({name,email,password:hashedPassword});
await user.save();
return res.json({success:true,message:"SignUP successfull"})
    
} catch (error) {
    return res.json({success:false,message:error.message})
}


};

export const login=async(req,res)=>{
    const{email,password}=req.body;
    console.log("BODY:", req.body);
if(!email || !password ){
return res.json({success:false,message:"Fields need to be required"})
    };
try {
const user=await userModel.findOne({email});
if(!user){
    return res.json({success:false,message:"User not exist"});
}
let isPassword=await bcrypt.compare(password,user.password);
if(!isPassword){
    return res.json({success:false,message:"Password is Wrong"})
}
const token=jwt.sign({id:user._id},process.env.JWT_SECRETS,{expiresIn:'7d'});

return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

} catch (error) {
    return res.json({success:false,message:error.message})
}

}