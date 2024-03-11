import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoGlobeSharp } from "react-icons/io5";
import { IoIosCloudDownload } from "react-icons/io";
import Logo from "../../assets/LogoWhite.png";

const SaveQR = () => {
  // const {id}=useParams();
  // const websiteURL = `http://localhost:5173/profileView/${id}`;

  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-biz-card-phi.vercel.app/product/getprofile",
          { withCredentials: true }
        );
        setProfile(response.data);
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);

  const websiteURL = `https://e-biz-card-phi.vercel.app/profileView/${profile._id}`;

  const handleQRCodeSave = async () => {
    try {
      const imageData = document.getElementById("qrcode-id").toDataURL();
      const response = await axios.post(
        "https://e-biz-card-phi.vercel.app/product/qrcodes",
        {
          imageData,
          userId: profile._id,
          username: profile.username,
          companyname: profile.companyname,
          title: profile.title,
          address: profile.address,
          website: profile.website,
          emailId: profile.emailId,
          mobile: profile.mobile,
          whatsapp: profile.whatsapp,
          logo: profile.logo,
        },
        { withCredentials: true }
      );

      console.log("Server response:", response);

      if (response.status === 201 && !response.data.error) {
        console.log("QR code, username, and companyname saved to backend");
        console.log("Navigating to /dashboard");
        navigate("/dashboard");
      } else {
        console.log("Server responded with an error:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving QR code and user details:", error);
    }
  };

  return (
    <div className="hero gradientBg">
      <div className="md:px-6 px-4 max-w-screen-2xl mx-auto section h-screen">
        <div className="flex justify-center items-center ">
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center justify-center space-x-3 text-primary"
            >
              <img
                src={Logo}
                alt="logo"
                className="w-10 inline-block items-center"
              />
              <span className="text-white">QUIKCARD</span>
            </a>
          </div>
        </div>

        <div className="bg-slate-100 rounded-xl rounded-br-[100px] md:p-6 p-4 sm:py-8 mt-10">
          <div className="flex flex-col  items-center gap-8 sm:gap-10 ">
            <div className="flex justify-center items-center ">
              <h1 className="text-3xl font-bold mt-10 text-center text-primary">
                Congratulations!
                <br />
                Your Digital Business Card is Ready!
              </h1>
            </div>

            <div className="w-full flex justify-center mt-5 ">
              <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-row gap-5 relative">
                  {/* main div */}
                  <div className="flex flex-col  bg-[#1a1a1a]  gap-3 text-white p-5 text-wrap ">
                    <div className="flex flex-row gap-5">
                      <div className="text-wrap">
                        <img
                          src={profile.logo}
                          className="h-[50px] w-[50px] rounded-full p-1 bg-purple-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-xl font-bold text-purple-500">
                          {profile.username}
                        </p>
                        <p className="text-md font-semibold  leading-4">
                          {profile.companyname}
                        </p>
                        <p className="text-sm">{profile.title}</p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-10 justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2 mt-5 items-center">
                          <FaLocationDot className="w-5 h-5 text-purple-500" />
                          <p className="text-sm">{profile.address}</p>
                        </div>

                        <div className="flex flex-row gap-2  items-center ">
                          <FaPhoneAlt className="w-5 h-5 text-purple-500" />
                          <p className="text-sm">{profile.mobile}</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                          <MdEmail className="w-5 h-5 text-purple-500" />
                          <p className="text-sm">{profile.emailId}</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                          <IoGlobeSharp className="w-5 h-5 text-purple-500" />
                          <p className="text-sm">{profile.website}</p>
                        </div>
                      </div>

                      <div className="flex justify-end items-end">
                        <div className=" p-1 bg-white ">
                          <QRCode id="qrcode-id" value={websiteURL} size={70} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.3 }}
                  className="flex flex-row justify-center items-center gap-5 my-7"
                >
                  <button className="button" onClick={handleQRCodeSave}>
                    <span>Save QR Code</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>
      <div className="cube"></div>

      <div className="cube"></div>
      <div className="cube"></div>
    </div>
  );
};

export default SaveQR;
