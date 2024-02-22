import { Profile, Work } from '../models/Profile.js';
import generateUniqueSessionId from '../helper/generateUniqueSessionId.js';
import mongoose from 'mongoose';

const createProfile = async (req, res) => {
  try {
   const {
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo,
    } = req.body;

    console.log(req.cookies);
    console.log(req.body);
    const { email } = req.cookies;
    console.log(email);

    const newProfile = new Profile({
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo, email
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


// const getProfile = async (req, res) => {
//   console.log("getProfile function is called");
//   try {
//     const { email } = req.cookies;
//     console.log("User's email from cookie:", email);
//     const tasks = await Profile.findOne({ email: email }).sort({ createdAt: -1}).limit(1).exec();
//     console.log("dashboard task : ", tasks);

//     // const data = await Profile.findOne({ email: email }).exec();
//     // res.status(200).send(data);

//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

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
    } else {
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



// const getWork = async (req, res) => {
//   try {
//     console.log('Received GET request to /product/getwork');
   
//     const { email } = req.cookies;

//     if (req.params.id) {
//       // If ID is provided in the URL, fetch a specific work
//       const workId = req.params.id;
//       console.log('Work ID:', req.params.id);
//       const work = await Work.findById(workId);

//       if (!work) {
//         return res.status(404).json({ message: 'Work not found' });
//       }

//       return res.status(200).json(work);
//     } else {
//       const { sessionId } = req.session;
//       console.log(sessionId);
//       // If no ID is provided, fetch all works
//       const data = await Work.find({ email: email, userId: userId}).sort({ createdAt: -1 }).exec();
//       console.log("dashboard task : ", data);
//       return res.status(200).json(data);
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

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
    username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo,
  } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Task not found"})
  }
  try{
    const profile=await Profile.findByIdAndUpdate({
      _id:id
    },
    {
      username,companyname,tagline,description,instagram,twitter,linkedin,website,mobile,whatsapp,banner,logo
    })
    res.json({ status: true, data: profile });
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


export { createProfile, getProfile ,getAllProfiles, createWork, getWork, updateProfile, deleteProfile , updateWork, deleteWork};





