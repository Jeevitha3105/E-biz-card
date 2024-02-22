import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import generateUniqueSessionId from "../helper/generateUniqueSessionId.js";

// SIGNUP

const signup = async(req,res) =>{
    const {username,email,password} = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.json({
            message: "User already exists"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({status: true, message: "record registered"})
}


// LOGIN

const login = async(req,res)=>{
    const {email,password} = req.body;

    req.session.userId = generateUniqueSessionId();
    req.session.email = email;

    console.log('Session Data:', req.session);

    const user = await User.findOne({email})
    if(!user){
        return res.json({message:"user is not registered"})
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if(!validPassword){
        return res.json({message:"password is incorrect"})
    }
    
    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1hr'})
    res.cookie('token',token, {httpOnly: true, maxAge: 360000})
    res.cookie("email", user.email, {httpOnly: true,secure: true});

    return res.json({status: true, message:"login successfully"})
}

// FORGOT PASSWORD

const forgotPassword = async(req,res)=>{
    const {email} = req.body;
    try{
        const user= await User.findOne({email})
        if(!user){
            return res.json({message: "user not registered"})
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1hr' });


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mailfortesting982@gmail.com',
              pass: 'dcop rdub zzwd ahau'
            }
          });
          
          var mailOptions = {
            from: 'mailfortesting982@gmail.com',
            to: email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({ message:"error sending email"});
            } else {
              return res.json({status:true, message:"email sent"});
            }
          });
    }catch(err){
        console.log(err);
    }
}

// RESET PASSWORD

const resetPassword = async(req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    try{
        const decoded = jwt.verify(token, process.env.KEY);
        console.log(decoded)
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
        return res.json({status: true, message: "updated password"})
    } catch(err){
        return res.json("invalid token")
    }
}

// VERIFY USER

const verifyUser = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false, message:"no token"})
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next();
    } catch(err){
        return res.json(err)
    }
    
}

// LOGOUT

const logout = async(req,res)=>{
    res.clearCookie('token')
    return res.json({status: true})
}

export default {signup, login, forgotPassword, resetPassword, verifyUser, logout};