import express  from "express"
const router = express.Router();

import UserController from '../controllers/userControllers.js'

router.post('/signup', UserController.signup)
router.post('/login', UserController.login)
router.post('/forgotPassword', UserController.forgotPassword)
router.post('/resetPassword/:token' , UserController.resetPassword)
router.get('/verify', UserController.verifyUser, (req,res)=>{
    return res.json({status:true, message:"authorised"})
})
router.get('/logout', UserController.logout)




export {router as userRouter}