import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function WorkDetails() {
    const [work, setWork] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/getwork/${id}`, { withCredentials: true })
                setWork(response.data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchData();
    }, [id]);

     return (
        <div>
        {work && (
          <div key={work._id}>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            <img src={work.cover} alt="Work Cover" />
          </div>
        )}
      </div>
    );
}
