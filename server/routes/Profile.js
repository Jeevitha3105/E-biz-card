import express from "express";
const router = express.Router();
import { createProfile, getProfile,getAllProfiles,createWork,getWork,updateProfile,deleteProfile, updateWork,deleteWork} from '../controllers/profileControllers.js';

router.post('/profile', createProfile);
router.get('/getprofile', getProfile);
router.get('/getprofile/:id', getProfile);
router.get('/getAllProfiles', getAllProfiles);

router.post('/work', createWork);
router.get('/getwork', getWork);
router.get('/getwork/:id', getWork);

router.patch('/updateProfile/:id', updateProfile);
router.patch('/updateWork/:id', updateWork);

router.delete('/deleteProfile/:id', deleteProfile);
router.delete('/deleteWork/:id', deleteWork)

export { router as profileRouter };

  