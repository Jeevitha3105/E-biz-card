import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { LuTwitter } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { fadeIn } from "../components/variants";

export default function AllProfile() {
  // const [profile, setProfile] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/product/getAllProfiles",
  //         { withCredentials: true }
  //       );
  //       setProfile(response.data);

  //       console.log("Response Data:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // ---------------delete-------------------//
  const handleDelete = (id) => {
    axios
      .delete(`https://e-biz-card-phi.vercel.app/product/deleteProfile/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  //------------- works-----------------//

  // const [works, setWorks] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/product/getwork",
  //         { withCredentials: true }
  //       );
  //       setWorks(response.data);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);


  // ---------------delete-------------------//
  const handleDeleteWork = (id) => {
    axios
      .delete(`https://e-biz-card-phi.vercel.app/product/deleteWork/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };





  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://e-biz-card-phi.vercel.app/product/getAllProfiles", { withCredentials: true });
        // Assuming the response data is an array of profiles
        const fetchedProfiles = response.data;

        // For each profile, fetch its works
        for (let profile of fetchedProfiles) {
          const worksResponse = await axios.get(`https://e-biz-card-phi.vercel.app/product/getwork/${profile._id}`, { withCredentials: true });
          profile.works = worksResponse.data; // Add a 'works' property to each profile
        }

        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);






  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    // <div className="hero">
    //   {profile.map((profile) => (
    //     <div
    //       className="md:px-6 px-4 max-w-screen-2xl mx-auto mb-10"
    //       key={profile._id}
    //     >
    //       <div className="flex justify-center items-center py-10">
    //         <div className="flex items-center space-x-4">
    //           <a
    //             href="/"
    //             className="text-2xl font-semibold flex items-center justify-center space-x-3 text-primary"
    //           >
    //             <img
    //               src={Logo}
    //               alt="logo"
    //               className="w-10 inline-block items-center"
    //             />
    //             <span className="text-secondary">QUIKCARD</span>
    //           </a>
    //         </div>
    //       </div>
    //       <div className="flex justify-center">
    //         <div className="w-full max-w-[400px] h-auto text-center border-2 rounded-2xl borderShadow box-shadow">
    //           <div className="relative">
    //             <div className="w-full relative inline-block">
    //               <img
    //                 src={profile.banner}
    //                 alt="banner image"
    //                 className="w-full h-[300px] relative z-[-5] rounded-2xl"
    //               />
    //             </div>
    //           </div>

    //           <div className="bg-[#FAEBD7] mt-[-63px] z-[10] p-5 rounded-tl-3xl rounded-tr-3xl">
    //             <div className="flex items-center justify-center">
    //               <img
    //                 src={profile.logo}
    //                 alt="Logo image"
    //                 className="mt-[-70px] w-[130px] h-[130px] border-2 rounded-full bg-white shadow-xl"
    //               />
    //             </div>

    //             <div className="flex flex-col gap-1">
    //               <h1 className="pt-5 font-bold text-xl">{profile.username}</h1>
    //               <h1 className="font-semibold text-lg">
    //                 {profile.companyname}
    //               </h1>
    //               <p className="text-md font-normal">{profile.tagline}</p>
    //             </div>

    //             <div className="flex flex-row gap-2 justify-center items-center py-5 ">
    //               <a href={profile.instagram}>
    //                 <FaInstagram className="w-7 h-7" />
    //               </a>
    //               <a href={profile.linkedin}>
    //                 <AiOutlineLinkedin className="w-7 h-7" />
    //               </a>
    //               <a href={profile.twitter}>
    //                 <LuTwitter className="w-7 h-7" />
    //               </a>
    //               <a href={profile.website}>
    //                 <BsGlobe2 className="w-7 h-7" />
    //               </a>
    //               <a href={`mailto:${profile.emailId}`}>
    //                 <MdEmail className="w-7 h-7" />
    //               </a>
    //             </div>
    //           </div>

    //           <div className="flex flex-row gap-5 justify-center items-center py-5">
    //             <div className="flex flex-row gap-2 px-5 py-2 contact-border rounded-full justify-center items-center ">
    //               <FaPhoneAlt className="w-5 h-5" />
    //               <h2>{profile.mobile}</h2>
    //             </div>
    //             <div className="flex flex-row gap-2 px-5 py-2 contact-border rounded-full justify-center items-center ">
    //               <FaWhatsapp className="w-5 h-5" />
    //               <h2>{profile.whatsapp}</h2>
    //             </div>
    //           </div>

    //           <div className="p-5">
    //             <h2 className="text-left pb-5 text-2xl font-bold">
    //               Description
    //             </h2>
    //             <p className="text-justify">{profile.description}</p>
    //           </div>

    //           <motion.div
    //             variants={fadeIn("up", 0.2)}
    //             initial="hidden"
    //             whileInView={"show"}
    //             viewport={{ once: false, amount: 0.3 }}
    //             className="flex flex-row gap-5 p-5 justify-center items-center"
    //           >
    //             <Link to={`/editProfile/${profile._id}`}>
    //               <button className="w-[150px] bg-[#1a1a1a] text-white py-3 px-2 hover:text-gray-400 rounded-full">
    //                 Edit Profile
    //               </button>
    //             </Link>{" "}
    //             <button
    //               className="w-[150px] bg-[#1a1a1a] text-white py-3 px-2 hover:text-gray-400 rounded-full"
    //               onClick={(e) => handleDelete(profile._id)}
    //             >
    //               Delete profile
    //             </button>
    //           </motion.div>

    //           {/* Work component  */}

    //           <div className="flex justify-end pt-10 pb-5">
    //             <Link to="/AddMore">
    //               <button className="w-[100px] h-[40px] rounded-xl bg-[#1a1a1a] text-white hover:text-gray-400">
    //                 Add Works
    //               </button>
    //             </Link>
    //           </div>

    //           <Slider {...sliderSettings} className="card-div">
    //             {works?.map((work) => (
    //               <div>
    //                 <div key={work._id} className="card-main">
    //                   <div className="img-container">
    //                     <img src={work.cover} alt="Work Cover" />
    //                   </div>

    //                   <div className="text-cont h-[70px] overflow-hidden">
    //                     <h1 className="text-lg">{work.title}</h1>
    //                   </div>

    //                   <Link to={`/workDetails/${work._id}`}>
    //                     <div className="discover bg-[#FAEBD7] cursor-pointer">
    //                       <button>Discover</button>
    //                     </div>
    //                   </Link>
    //                 </div>

    //                 <div className="flex flex-row gap-5 p-5 justify-center items-center m-0 ml-[-30px]">
    //                   <Link to={`/editWorks/${work._id}`}>
    //                     <button className="boton-elegante">
    //                       <MdEdit className="text-purple-500" />
    //                     </button>
    //                   </Link>{" "}
    //                   <button
    //                     className="boton-elegante"
    //                     onClick={(e) => handleDeleteWork(work._id)}
    //                   >
    //                     <MdDelete className="text-purple-500" />
    //                   </button>
    //                 </div>
    //               </div>
    //             ))}
    //           </Slider>
    //         </div>
    //       </div>
    //     </div>
    //   ))}

    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    //   <div className="cube"></div>
    // </div>




    <div className="hero">
       {profiles.map((profile) => (
        <div
          className="md:px-6 px-4 max-w-screen-2xl mx-auto mb-10"
          key={profile._id}
        >
          <div className="flex justify-center items-center py-10">
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
                  <h1 className="pt-5 font-bold text-xl">{profile.username}</h1>
                  <h1 className="font-semibold text-lg">
                    {profile.companyname}
                  </h1>
                  <p className="text-md font-normal">{profile.tagline}</p>
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

              <motion.div
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className="flex flex-row gap-5 p-5 justify-center items-center"
              >
                <Link to={`/editProfile/${profile._id}`}>
                  <button className="w-[150px] bg-[#1a1a1a] text-white py-3 px-2 hover:text-gray-400 rounded-full">
                    Edit Profile
                  </button>
                </Link>{" "}
                <button
                  className="w-[150px] bg-[#1a1a1a] text-white py-3 px-2 hover:text-gray-400 rounded-full"
                  onClick={(e) => handleDelete(profile._id)}
                >
                  Delete profile
                </button>
              </motion.div>

              {/* Work component  */}


              <div className="flex justify-end pt-10 pb-5">
                <Link to={`/AddMore/${profile._id}`}>
                  <button className="w-[100px] h-[40px] rounded-xl bg-[#1a1a1a] text-white hover:text-gray-400">
                    Add Works
                  </button>
                </Link>
              </div>

              <Slider {...sliderSettings} className="card-div">
              {profile.works?.map((work) => (
                  <div>
                    <div key={work._id} className="card-main">
                      <div className="img-container">
                        <img src={work.cover} alt="Work Cover" />
                      </div>

                      <div className="text-cont h-[70px] overflow-hidden">
                        <h1 className="text-lg">{work.title}</h1>
                      </div>

                      <Link to={`/workDetails/${work._id}`}>
                        <div className="discover bg-[#FAEBD7] cursor-pointer">
                          <button>Discover</button>
                        </div>
                      </Link>
                    </div>

                    <div className="flex flex-row gap-5 p-5 justify-center items-center m-0 ml-[-30px]">
                      <Link to={`/editWorks/${work._id}`}>
                        <button className="boton-elegante">
                          <MdEdit className="text-purple-500" />
                        </button>
                      </Link>{" "}
                      <button
                        className="boton-elegante"
                        onClick={(e) => handleDeleteWork(work._id)}
                      >
                        <MdDelete className="text-purple-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ))}

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
}
