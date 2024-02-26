import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import convertToBase64 from "./convertToBase64";
import { useParams } from "react-router-dom";

export default function EditWorks() {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState();
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    // Fetch the existing profile data based on the URL parameter (match.params.id)
    axios
      .get(`http://localhost:3000/product/getwork/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

          setTitle(res.data.title);
          setCover(res.data.cover);
          setDescription(res.data.description);
  
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);



  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:3000/product/updateWork/${id}`,
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
          navigate("/allProfiles");
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
