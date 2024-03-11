import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Profile from "../pages/Profile";

export default function QRGenerate() {
  const [profile, setProfile] = useState([]);
  const { id } = useParams();

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
  }, [id]);

  return (
    <div>
      <div>
        <Profile profile={profile} />
      </div>

      {profile._id ? (
        <div key={profile._id}>
          <div className="flex justify-center items-center pb-10 hover:scale-115 transform transition-transform">
            <Link to={`/Qrcode/${profile._id}`}>
              <button className="bg-primary py-5 px-20 text-white rounded-full transform transition-transform hover:scale-105 text-lg">
                Generate
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}
