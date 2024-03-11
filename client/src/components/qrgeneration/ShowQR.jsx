import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { Link, useParams } from "react-router-dom";
import feature from "../../assets/feature.png";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoGlobeSharp } from "react-icons/io5";
import { IoIosCloudDownload } from "react-icons/io";

const ShowQR = () => {
  const [qrCodes, setQRCodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-biz-card-phi.vercel.app/product/getAllQRCodes"
        );
        setQRCodes(response.data);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      }
    };

    fetchData();
  }, []);

  const targetElementRef = useRef(null);
  const handleDownload = async (qrCode) => {
    try {
      // Disable the download button during the capture process
      const downloadButton = document.getElementById(
        `downloadButton-${qrCode._id}`
      );
      if (downloadButton) {
        downloadButton.disabled = true;
      }

      // Wait for a short delay (e.g., 1 second) to allow the UI to update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get the target element using the ref
      const targetElement = targetElementRef.current;

      if (targetElement) {
        // Use html2canvas with custom dimensions for the capture
        const canvas = await html2canvas(targetElement, {
          x: targetElement.offsetLeft,
          y: targetElement.offsetTop,
          width: targetElement.offsetWidth,
          height: targetElement.offsetHeight,
        });

        // Create a data URL and trigger the download
        const dataUrl = canvas.toDataURL();
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qr_code_${qrCode._id}.png`;
        link.click();
      } else {
        console.error("Target element ref not found.");
      }
    } catch (error) {
      console.error("Error creating image:", error);
    } finally {
      // Re-enable the download button after the capture process
      const downloadButton = document.getElementById(
        `downloadButton-${qrCode._id}`
      );
      if (downloadButton) {
        downloadButton.disabled = false;
      }
    }
  };

  const { email } = useParams();

  const handleDelete = async () => {
    console.log("User Email:", email); // Add this line to check userEmail
    try {
      await axios.delete(
        `https://e-biz-card-phi.vercel.app/product/deleteAllData/${email}`
      );
      console.log("User data deleted successfully");
      window.location.reload();
      // Optionally, you can trigger any additional actions or updates on the frontend
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  };


  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-20">
      {qrCodes.map((qrCode) => (
        <div key={qrCode._id}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 relative">
              {/* main div */}
              <div
                ref={(ref) => (targetElementRef.current = ref)}
                className="flex flex-col  bg-[#1a1a1a]  gap-3 text-white p-5 text-wrap max-w-[450px] w-[100%] h-[250px]"
              >
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-5">
                    <div className="text-wrap">
                      <img
                        src={qrCode.logo}
                        className="h-[50px] w-[50px] rounded-full p-1 bg-purple-500"
                      />
                    </div>

                    <div className="flex flex-col">
                      <p className="text-xl font-bold text-purple-500">
                        {qrCode.username}
                      </p>
                      <p className="text-md font-semibold  leading-4">
                        {qrCode.companyname}
                      </p>
                      <p className="text-sm">{qrCode.title}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-10 justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 mt-5 items-center">
                      <FaLocationDot className="w-5 h-5 text-purple-500" />
                      <p className="text-sm">{qrCode.address}</p>
                    </div>

                    <div className="flex flex-row gap-2  items-center ">
                      <FaPhoneAlt className="w-5 h-5 text-purple-500" />
                      <p className="text-sm">{qrCode.mobile}</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                      <MdEmail className="w-5 h-5 text-purple-500" />
                      <p className="text-sm">{qrCode.emailId}</p>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                      <IoGlobeSharp className="w-5 h-5 text-purple-500" />
                      <p className="text-sm">{qrCode.website}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 items-end justify-end">
                    <div className=" p-1 bg-white h-[70px] w-[70px]">
                      <img
                        src={qrCode.imageData}
                        alt={`QR Code - ${qrCode._id}`}
                        className=""
                      />
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
              className="flex flex-row gap-5"
            >
              <Link to="/allProfiles">
                <button className="boton-elegante">
                  <MdEdit className="text-purple-500" />
                </button>
              </Link>

              <button onClick={handleDelete} className="boton-elegante">
                <MdDelete className="text-purple-500" />
              </button>

              <button
                id={`downloadButton-${qrCode._id}`}
                className="boton-elegante"
                onClick={() => handleDownload(qrCode)}
              >
                <IoIosCloudDownload className="text-purple-500" />
              </button>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowQR;
