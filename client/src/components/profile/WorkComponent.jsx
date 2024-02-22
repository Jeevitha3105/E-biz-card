import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WorkComponent() {
  const [works, setWorks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/product/getwork",
          { withCredentials: true }
        );
        setWorks(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {works?.map((work) => (
        <div key={work._id}>
          <h1>{work.title}</h1>
          <img src={work.cover} alt="Work Cover" />
          <Link to={`/workDetails/${work._id}`}>
            <button>Discover</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
