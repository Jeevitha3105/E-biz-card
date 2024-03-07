import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Slider {...sliderSettings} className="card-div">
        {works?.map((work) => (
          <div key={work._id} className="card-main">
            <div className="img-container">
              <img src={work.cover} alt="Work Cover" />
            </div>

            <div className="text-cont h-[70px] overflow-hidden">
              <h1 className="text-md text-primary">{work.title}</h1>
            </div>

            <Link to={`/workDetails/${work._id}`}>
              <div className="discover bg-[#FAEBD7] cursor-pointer">
                <button>Discover</button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </>
  );
}
