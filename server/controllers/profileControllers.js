import { Profile, Work, QRCode } from '../models/Profile.js';
import generateUniqueSessionId from '../helper/generateUniqueSessionId.js';
import mongoose from 'mongoose';

const createProfile = async (req, res) => {
  try {
   const {
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo,emailId,title, address
    } = req.body;

    console.log(req.cookies);
    console.log(req.body);
    const { email } = req.cookies;
    console.log(email);

    const newProfile = new Profile({
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo, email,emailId,title, address
    });

   
    await newProfile.save();

    console.log("taskemailid : ", email);
    const tasks = await Profile.findOne({ email: email });
    console.log("dashboard task : ", tasks);

    return res.json({status: true, message: "profile created"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getProfile = async (req, res) => {
  console.log("getProfile function is called");
  try {
    const { email } = req.cookies;
    console.log("User's email from cookie:", email);

    if (req.params.id) {
      // If there is an id parameter, fetch the profile based on the id
      const tasks = await Profile.findById(req.params.id).exec();
      console.log("Profile by id: ", tasks);
      res.status(200).json(tasks);
    } 
    else {
      // If no id parameter, fetch the latest profile based on the user's email
      const tasks = await Profile.findOne({ email: email }).sort({ createdAt: -1}).limit(1).exec();
      console.log("Latest profile: ", tasks);
      res.status(200).json(tasks);
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Error fetching profile" });
  }
};



// Route to get all profiles associated with a specific email
const getAllProfiles= async (req, res) => {
  try {
    const { email } = req.cookies;
    console.log("User's email from cookie:", email);

    const allProfiles = await Profile.find({ email: email }).lean();
    
    if (allProfiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found for the given email' });
    }

    console.log("All profiles:", allProfiles);

    res.status(200).json(allProfiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const createWork = async (req, res) => {
 
  try {

    const {
      title,description,cover,userId
    } = req.body;

    // const { userId } = req.session;
    const { email} = req.cookies;

    const sessionId = generateUniqueSessionId(); 
    req.session.sessionId = sessionId;

    const newWork = new Work({
      title,description,cover,email,sessionId,userId
      });

    await newWork.save();

    console.log("taskemailid : ", email);
    const task = await Work.find({ email: email, sessionId:sessionId});
    console.log("dashboard task : ", task);

    return res.json({status: true, message: "profile created"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




const getWork = async (req, res) => {
  try {
    console.log('Received GET request to /product/getwork');

    const { email } = req.cookies;

    if (req.params.id) {
      // If ID is provided in the URL, fetch a specific work
      const workId = req.params.id;
      console.log('Work ID:', req.params.id);
      const work = await Work.findById(workId);

      if (!work) {
        return res.status(404).json({ message: 'Work not found' });
      }

      return res.status(200).json(work);
    } else {
      // If no ID is provided, fetch all works for the user's email
      const data = await Work.find({ email: email }).sort({ createdAt: -1 }).exec();
      console.log("dashboard task : ", data);
      return res.status(200).json(data);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};





// ------------------------------------Update profile------------------------------------------------------//

const updateProfile = async(req,res)=>{
  const {id} = req.params;
  const {
    username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo,emailId,title, address
  } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Task not found"})
  }
  try{
    const profile=await Profile.findByIdAndUpdate({
      _id:id
    },
    {
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo,emailId,title, address
    })
    res.json({ status: true, data: profile });

    //  // Find and update the corresponding record in /qrcodes
    //  const userId = req.params.id;
    //  const qrcodeRecord = await QRCode.findOne({ userId });
 
    //  if (qrcodeRecord) {
    //    // Update qrcodeRecord fields based on req.body
    //    qrcodeRecord.username = req.body.username;
    //    qrcodeRecord.companyname = req.body.companyname;
    //    qrcodeRecord.title = req.body.title;
    //    qrcodeRecord.website = req.body.website;
    //    qrcodeRecord.emailId = req.body.emailId;
    //    qrcodeRecord.mobile = req.body.mobile;
    //    qrcodeRecord.whatsapp= req.body.whatsapp;
    //    qrcodeRecord.address= req.body.address;
 
    //    await qrcodeRecord.save();
    //  }
 
    //  res.status(200).json({ status: true, message: 'Profile updated successfully' });

  } catch (e){
    res.status(404).json({error: e.message})
  }
}




// update works

const updateWork= async(req,res)=>{
  const {id} = req.params;
  const {
    title,description,cover
  } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Task not found"})
  }
  try{
    const works=await Work.findByIdAndUpdate({
      _id:id
    },
    {
      title,description,cover
    })
    res.json({ status: true, data: works });
  } catch (e){
    res.status(404).json({error: e.message})
  }
}



// --------------------------------Delete profile-------------------------------//
const deleteProfile = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Task not found"})
  }
  try{
    const profile=await Profile.findByIdAndDelete(id);
    res.status(200).json(profile)
  } catch (e){
    res.status(404).json({error: e.message})
  }
}

const deleteWork = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Task not found"})
  }
  try{
    const work=await Work.findByIdAndDelete(id);
    res.status(200).json(work)
  } catch (e){
    res.status(404).json({error: e.message})
  }
}


//-------------------------------------QRcode---------------------------------------//

// const QRCodes = async (req, res) => {
//   try {
//     const { imageData,username, companyname, title, mobile,whatsapp,address,website,emailId, userId} = req.body;
//     const newQRCode = new QRCode({ imageData,username, companyname,title, mobile,whatsapp,address,website,emailId, userId});
//     await newQRCode.save();
//     res.status(201).json({ message: 'QR code saved successfully' });
//   } catch (error) {
//     console.error('Error saving QR code:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const QRCodes = async (req, res, next) => {
  const { userId } = req.body;
  const { email } = req.cookies;
  console.log(email);

  try {
    // Check if an entry exists for the user
    let qrCodeEntry = await QRCode.findOne({ userId });

    if (qrCodeEntry) {
      // If an entry exists, update it with the new data
      qrCodeEntry = await QRCode.findOneAndUpdate({ userId }, req.body, { new: true });
    } else {
      // If no entry exists, create a new one
      qrCodeEntry = new QRCode({...req.body, email:email});
      await qrCodeEntry.save();
    }

    // Send a response indicating success
    res.status(201).json({ success: true, data: qrCodeEntry });
  } catch (error) {
    // Handle errors
    console.error('Error updating QR code:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


//get
const getAllQRCodes = async (req, res) => {
  try {
      const allQRCodes = await QRCode.find();
      res.status(200).json(allQRCodes);
  } catch (error) {
      console.error('Error retrieving QR codes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};




//Delete all the data associated with email

const deleteAllData = async (req, res) => {
  try {
    const { email } = req.cookies;

    // Delete profile data
    await Profile.deleteMany({ email });

    // Delete work data
    await Work.deleteMany({ email });

    // Delete QR code data
    await QRCode.deleteMany({ email });

    res.status(200).json({ success: true, message: 'User data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};






export { createProfile, getProfile ,getAllProfiles, createWork, getWork, updateProfile, deleteProfile , updateWork, deleteWork,QRCodes,getAllQRCodes,deleteAllData};





