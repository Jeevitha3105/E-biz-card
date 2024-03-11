import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    companyname:{
        type:String,
        required: true,
    },
    tagline:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    banner:{
        type:String,
        required: true,
    },
    logo:{
        type:String,
        required: true,
    },

    instagram:{
        type:String,
        required: true,
    },
    twitter:{
        type:String,
        required: true,
    },
    linkedin:{
        type:String,
        required: true,
    },
    website:{
        type:String,
        required: true,
    },

    mobile:{
        type:String,
        required: true,
    },
    whatsapp:{
        type:String,
        required: true,
    },
    emailId:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    email: {
        type:String,
        // unique:true,
    },
   
},
{ timestamps: true } )


const workSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // Reference to the Profile model
        required: true,
    },
    email: {
        type:String,
        // unique:true,
    },
}, { timestamps: true });


const QRCodeSchema = new mongoose.Schema({
    imageData: {
      type: String,
      required: true,
    },
    username:{
        type: String,
    },
    companyname:{
        type: String,
    },
    title:{
        type: String,
    },
    address:{
        type: String,
    },
    emailId:{
        type: String,
    },
    mobile:{
        type: String,
    },
    whatsapp:{
        type: String,
    },
    website:{
        type: String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // Reference to the Profile model
        required: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
        type:String,
        // unique:true,
    },
    logo:{
        type:String,
    }
  });

const ProfileModel = mongoose.model("Profile", ProfileSchema)
const WorkModel = mongoose.model("Work", workSchema)
const QRModel = mongoose.model("QRCode", QRCodeSchema)

export {ProfileModel as Profile, WorkModel as Work, QRModel as QRCode}



