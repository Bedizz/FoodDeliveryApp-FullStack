import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// Generating token for a new user
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// login User

export const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const checkUser = await userModel.findOne({email})
        if (!checkUser) {
            return res.json({success:false,message:"User does not exist"})           
        }
        const isMatch = await bcrypt.compare(password,checkUser.password)
        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
            
        }
        const token = createToken(checkUser._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

// register User

export const registerUser =async(req,res) => {
    const {name,password,email} = req.body
    try {
        const existUser = await userModel.findOne({email})
        if (existUser) {
            return res.json({success:false, message:"User already exists"})
            
        } 
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})    
        }
        if (!validator.isStrongPassword(password)) {
            return res.json({success:false,message:"Please enter a strong password"})    
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}
// delete User
export const deleteUser = (req,res) => {

}