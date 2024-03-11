import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import convertToBase64 from "./convertToBase64";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import Logo from "../../assets/LogoWhite.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdOutlineBusiness } from "react-icons/md";
import { FaHashtag } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { LuTwitter } from "react-icons/lu";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlinePhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import { MdErrorOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function EditProfile() {
  const { id } = useParams();
  const websiteURL = `https://e-biz-card-phi.vercel.app/profileView/${id}`;

  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);

  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [emailId, setMail] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect is running");
    axios
      .get(`https://e-biz-card-phi.vercel.app/product/getProfile/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Full response:", res);
        console.log("Response data:", res.data);

        setUsername(res.data.username);
        setCompanyname(res.data.companyname);
        setTagline(res.data.tagline);
        setDescription(res.data.description);
        setBanner(res.data.banner);
        setLogo(res.data.logo);
        setInstagram(res.data.instagram);
        setTwitter(res.data.twitter);
        setLinkedin(res.data.linkedin);
        setWebsite(res.data.website);
        setMobile(res.data.mobile);
        setWhatsapp(res.data.whatsapp);
        setTitle(res.data.title);
        setMail(res.data.emailId);
        setAddress(res.data.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update profile data
      const updateProfileResponse = await axios.patch(
        `https://e-biz-card-phi.vercel.app/product/updateProfile/${id}`,
        {
          username,
          title,
          companyname,
          tagline,
          description,
          banner,
          logo,
          instagram,
          twitter,
          linkedin,
          website,
          mobile,
          whatsapp,
          emailId,
          address,
        },
        { withCredentials: true }
      );

      // Check if profile update was successful
      if (updateProfileResponse.data.status) {
        console.log("Profile updated successfully");

        const imageData = document.getElementById("qrcode-id").toDataURL();

        // Update QR code data
        const updateQRCodeResponse = await axios.patch(
          "https://e-biz-card-phi.vercel.app/product/qrcodes",
          {
            imageData,
            userId: id,
            username,
            companyname,
            title,
            address,
            website,
            emailId,
            mobile,
            whatsapp,
          }
        );

        // Check if QR code update was successful
        if (
          updateQRCodeResponse.status === 201 &&
          !updateQRCodeResponse.data.error
        ) {
          console.log("QR code, username, and companyname updated in /qrcodes");
          console.log("Navigating to /allProfiles");
          setSuccessMessage("Profile updated successfully!");

          setTimeout(() => {
            navigate("/allProfiles");
          }, 1000);
        } else {
          console.log(
            "Server responded with an error:",
            updateQRCodeResponse.data.message
          );
        }
      } else {
        console.log(
          "Error updating profile:",
          updateProfileResponse.data.message
        );
      }
    } catch (error) {
      console.error("Error updating profile and QR code details:", error);
      setError("Error updating details, try again later!");

      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const onUploadBanner = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setBanner(base64);
  };
  const onUploadLogo = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setLogo(base64);
  };

  // max limit

  const maxCharacters = 1000;

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    const limitedText = inputText.slice(0, maxCharacters);
    setDescription(limitedText);
    console.log(limitedText);
  };
  const characterCount = description.length;
  const isInputExceededLimit = characterCount >= maxCharacters;

  return (
    <div className="hero gradientBg">
      <div className="md:px-6 px-4 max-w-screen-2xl mx-auto ">
        <div className="flex justify-center items-center  py-10">
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
        <div className="flex justify-center ">
          {/* gradientBg */}
          <form
            className="w-full max-w-[400px] h-auto border-2 rounded-2xl borderShadow p-10 flex items-center justify-center flex-col my-[1rem] bg-white gap-5 box-shadow"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-semibold text-primary">USER DETAILS</h1>
            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Username</legend>

              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <FaRegUserCircle className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Title</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <MdOutlineWorkOutline className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="ttext-md text-primary">Company name</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <MdOutlineBusiness className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={companyname}
                  onChange={(e) => setCompanyname(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Tagline</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <FaHashtag className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Description</legend>
              <div className="flex flex-row gap-2  w-[300px]">
                <TfiWrite className="w-6 h-6 text-gray-700" />
                <textarea
                  type="text"
                  // onChange={(e) => setDescription(e.target.value)}
                  onChange={handleInputChange}
                  rows={4}
                  cols={50}
                  value={description}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            {isInputExceededLimit && (
              <p className="text-red-700">
                Word limit exceeded! Maximum {maxCharacters} words allowed.
              </p>
            )}

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend htmlFor="profile" className="text-md text-primary">
                Logo
              </legend>
              <img src={logo} />
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUploadLogo}
                className="bg-transparent w-[300px] border-none focus:outline-none hidden"
              />
              <label
                htmlFor="profile"
                className="flex items-center justify-center my-5 cursor-pointer"
              >
                <FaCloudUploadAlt className="w-7 h-7 text-gray-700" />
              </label>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend htmlFor="profile2" className="text-md text-primary">
                Banner image
              </legend>
              <img src={banner} />
              <input
                type="file"
                id="profile2"
                name="profile"
                onChange={onUploadBanner}
                className="bg-transparent w-[300px] border-none focus:outline-none hidden"
              />
              <label
                htmlFor="profile2"
                className="flex items-center justify-center my-5 cursor-pointer"
              >
                <FaCloudUploadAlt className="w-7 h-7 text-gray-700" />
              </label>
            </fieldset>

            <h1 className="text-xl font-semibold">SOCIAL MEDIA LINKS</h1>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Instagram</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <FaInstagram className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">LinkedIn</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <AiOutlineLinkedin className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Twitter</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <LuTwitter className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Website</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <BsGlobe2 className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <h1 className="text-xl font-semibold">CONTACT DETAILS</h1>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Mobile No.</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <MdOutlinePhone className="w-6 h-6 text-gray-700" />
                <input
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Whatsapp</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <FaWhatsapp className="w-6 h-6 text-gray-700" />
                <input
                  type="number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Email</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <CgMail className="w-6 h-6 text-gray-700" />
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setMail(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset
              style={{
                border: "1px solid #000",
                padding: "2px",
                width: "300px",
                borderRadius: "7px",
              }}
            >
              <legend className="text-md text-primary">Address</legend>
              <div className="flex flex-row gap-2 justify-center items-center w-[300px]">
                <GrLocation className="w-6 h-6 text-gray-700" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-transparent w-[300px] border-none focus:outline-none"
                />
              </div>
            </fieldset>

            <QRCode id="qrcode-id" value={websiteURL} size={70} />

            {error && (
              <div className="pt-3 flex flex-row gap-2 items-center justify-center">
                <MdErrorOutline className="w-7 h-7 text-red-700" />
                <p className=" text-red-700 text-lg">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="pt-3 flex flex-row gap-2 items-center justify-center">
                <TiTick className="w-7 h-7 text-green-700" />
                <p className=" text-green-700 text-lg">{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-[100px] h-[40px] rounded-full bg-primary text-white hover:text-gray-400"
            >
              Save
            </button>
          </form>
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
}
