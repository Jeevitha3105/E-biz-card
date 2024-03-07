import React, { useEffect, useState } from "react";
import WorkComponent from "../components/profile/WorkComponent";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { LuTwitter } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Logo from "../assets/Logo.png";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (id) {
          // If id is present in the URL, fetch profile by id
          response = await axios.get(
            `http://localhost:3000/product/getprofile/${id}`,
            { withCredentials: true }
          );
        } else {
          // If id is not present, fetch the latest profile based on user's email
          response = await axios.get(
            "http://localhost:3000/product/getprofile",
            { withCredentials: true }
          );
        }

        setProfile(response.data);
        console.log("Response Data:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {profile && (
        <div
          className="md:px-6 px-4 max-w-screen-2xl mx-auto mb-10"
          key={profile._id}
        >
          <div className="flex justify-center items-center bg-white py-10">
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
                <span className="text-secondary">QUIKCARD</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[400px] h-auto text-center border-2 rounded-2xl borderShadow box-shadow">
              <div className="relative">
                <div className="w-full relative inline-block">
                  <img
                    src={profile.banner}
                    alt="banner image"
                    className="w-full h-[300px] relative z-[-5] rounded-2xl"
                  />
                </div>
              </div>

              <div className="bg-[#FAEBD7] mt-[-63px] z-[10] p-5 rounded-tl-3xl rounded-tr-3xl">
                <div className="flex items-center justify-center">
                  <img
                    src={profile.logo}
                    alt="Logo image"
                    className="mt-[-70px] w-[130px] h-[130px] border-2 rounded-full bg-white shadow-xl"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h1 className="pt-5 font-bold text-xl overflow-hidden overflow-ellipsis text-wrap">
                    {profile.username}
                  </h1>
                  <h1 className="font-semibold text-lg overflow-hidden overflow-ellipsis text-wrap">
                    {profile.companyname}
                  </h1>
                  <p className="text-md font-normal overflow-hidden overflow-ellipsis text-wrap">
                    {profile.tagline}
                  </p>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center py-5 ">
                  <a href={profile.instagram}>
                    <FaInstagram className="w-7 h-7" />
                  </a>
                  <a href={profile.linkedin}>
                    <AiOutlineLinkedin className="w-7 h-7" />
                  </a>
                  <a href={profile.twitter}>
                    <LuTwitter className="w-7 h-7" />
                  </a>
                  <a href={profile.website}>
                    <BsGlobe2 className="w-7 h-7" />
                  </a>
                  <a href={`mailto:${profile.emailId}`}>
                    <MdEmail className="w-7 h-7" />
                  </a>
                </div>
              </div>

              <div className="flex flex-row gap-5 justify-center items-center py-5">
                <div className="flex flex-row gap-2 px-5 py-2 contact-border rounded-full justify-center items-center ">
                  <FaPhoneAlt className="w-5 h-5" />
                  <h2>{profile.mobile}</h2>
                </div>
                <div className="flex flex-row gap-2 px-5 py-2 contact-border rounded-full justify-center items-center ">
                  <FaWhatsapp className="w-5 h-5" />
                  <h2>{profile.whatsapp}</h2>
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-left pb-5 text-2xl font-bold">
                  Description
                </h2>
                <p className="text-justify">{profile.description}</p>
              </div>

              <div className="p-5">
                <h2 className="text-left pb-5 text-2xl font-bold">Works</h2>
                <WorkComponent />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
