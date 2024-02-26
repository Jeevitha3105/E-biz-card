import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/home/Dashboard";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Home from "./components/home/Home";
import Landing from "./pages/Landing";
import ProfileCreation from "./components/profile/ProfileCreation";
import Profile from "./pages/Profile";
import WorkDetails from "./components/profile/WorkDetails";
import Work from "./components/profile/Work";
import AllProfiles from "./pages/AllProfiles";
import EditProfile from "./components/profile/EditProfile";
import EditWorks from "./components/profile/EditWorks";
import QRcode from "./components/qrgeneration/QRcode";
import QRGenerate from "./pages/QRGenerate";
import AddMore from "./components/profile/AddMore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/profileCreation" element={<ProfileCreation />}></Route>
        <Route path="/profileView" element={<Profile />}></Route>
        <Route path="/work" element={<Work />} />
        <Route path="/workDetails/:id" element={<WorkDetails />} />
        <Route path="/allProfiles" element={<AllProfiles />} />
        <Route path="/editProfile/:id" element={<EditProfile />} />
        <Route path="/editWorks/:id" element={<EditWorks />} />

        <Route path="/Qrcode/:id" element={<QRcode />} />
        <Route path="/profileView/:id" element={<Profile />}></Route>

        <Route path="/QRGenerate" element={<QRGenerate />}></Route>
        <Route path="/AddMore" element={<AddMore />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
