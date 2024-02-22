import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    username:{
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
    email: {
        type:String,
        unique:true,
    },
   
},
{ timestamps: true } )

const workSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    cover:{
        type:String,
        required: true,
    },
    email: {
        type:String,
        unique:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile", // Reference to the Profile model
        required: false,
    },
},{ timestamps: true })

const ProfileModel = mongoose.model("Profile", ProfileSchema)
const WorkModel = mongoose.model("Work", workSchema)

export {ProfileModel as Profile, WorkModel as Work}



