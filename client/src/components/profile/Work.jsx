import React, { useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import convertToBase64 from "./convertToBase64";
export default function Work() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState();
  const [description, setDescription] = useState("");
  const [works, setWorks] = useState([]);

  const {id} = useParams();

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
          navigate("/profileView");
        }
      })
      .catch((err) => {
        console.log(err);
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

          // Clear the form fields
          setTitle("");
          setCover("");
          setDescription("");
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
    <div>
      <button onClick={handleAdd}>ADD another</button>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label>Description</label>
        <textarea
          type="text"
          placeholder="Name"
          // onChange={(e) => setDescription(e.target.value)}
          onChange={handleInputChange}
          rows={10}
          cols={50}
          value={description}
        />
        {isInputExceededLimit && (
          <p style={{ color: "red" }}>
            Word limit exceeded! Maximum {maxCharacters} words allowed.
          </p>
        )}

        <label htmlFor="cover">Cover Image</label>
        <img src={cover} />
        <input type="file" onChange={onUpload} id="cover" name="cover" />

        <button type="submit">Save</button>
      </form>

    </div>
  );
}
