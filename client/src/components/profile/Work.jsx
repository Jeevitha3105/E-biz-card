import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import convertToBase64 from "./convertToBase64";
import Logo from "../../assets/LogoWhite.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";

export default function Work() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState();
  const [description, setDescription] = useState("");
  const [works, setWorks] = useState([]);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/product/work",
        {
          title,
          cover,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          console.log("Navigating to /profileView");
          // navigate("/profileView");
          setSuccessMessage("Work created successfully!");

          setTimeout(() => {
            navigate("/QRGenerate");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Please enter all the fields");

        setTimeout(() => {
          setError("");
        }, 1000);
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3000/product/work",
        {
          title,
          cover,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setWorks((prevWorks) => [...prevWorks, res.data.work]);

          setSuccessMessage("Saved successfully!");

          setTimeout(() => {
            setTitle("");
            setCover("");
            setDescription("");
          }, 1000);
          // Clear the form fields
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setCover(base64);
  };

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
    <>
      <div className="hero gradientBg">
        <div className="md:px-6 px-4 max-w-screen-2xl mx-auto">
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
                <span className="text-white">QUIKCARD</span>
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-[400px] h-auto border-2 rounded-2xl borderShadow p-10 flex items-center justify-center flex-col my-[1rem] bg-white gap-5 box-shadow"
            >
              <h1 className="text-xl font-semibold text-primary">
                WORK DETAILS
              </h1>
              <div className="flex justify-end items-center w-[300px]">
                <button
                  onClick={handleAdd}
                  className="w-[100px] h-[40px] rounded-lg bg-primary text-white hover:text-gray-400"
                >
                  Save & Add
                </button>
              </div>
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
                  <RiText className="w-6 h-6 text-gray-700" />
                  <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
                  <FiFileText className="w-6 h-6 text-gray-700" />
                  <textarea
                    type="text"
                    // onChange={(e) => setDescription(e.target.value)}
                    onChange={handleInputChange}
                    rows={10}
                    cols={50}
                    value={description}
                    className="bg-transparent w-[300px] border-none focus:outline-none"
                  />
                </div>
              </fieldset>
              {isInputExceededLimit && (
                <p className="text-lg text-red-700 text-center font-medium">
                  Word limit exceeded!
                  <br /> Maximum {maxCharacters} words allowed.
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
                <legend htmlFor="cover" className="text-md text-primary">
                  Cover Image
                </legend>
                <img src={cover} />
                <input
                  type="file"
                  onChange={onUpload}
                  id="cover"
                  name="cover"
                  className="bg-transparent w-[300px] border-none focus:outline-none hidden"
                />
                <label
                  htmlFor="cover"
                  className="flex items-center justify-center my-5 cursor-pointer"
                >
                  <FaCloudUploadAlt className="w-7 h-7 text-gray-700" />
                </label>
              </fieldset>

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
                Save All
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
    </>
  );
}
