import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function WorkDetails() {
  const [work, setWork] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://e-biz-card-phi.vercel.app/product/getworks/${id}`,
          { withCredentials: true }
        );
        setWork(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="md:px-6 px-4 max-w-screen-2xl mx-auto mb-10">
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
          <div className="w-full max-w-[400px] h-auto text-center border-2 rounded-3xl borderShadow box-shadow p-5">
            <div>
              {work && (
                <div key={work._id}>
                  <div className="text-cont max-w-[350px]">
                    <h1 className="text-2xl font-bold text-primary">
                      {work.title}
                    </h1>
                  </div>

                  <div className="img-container py-10">
                    <img src={work.cover} alt="Work Cover" className="" />
                  </div>

                  <div>
                    <ul className="text-lg list-disc list-inside">
                      <li className="text-justify">{work.description}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
