import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Profile from '../pages/Profile';

export default function QRGenerate() {
    const [profile, setProfile] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/getprofile', { withCredentials: true });
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
                    
                    

                    <Link to={`/Qrcode/${profile._id}`}>
                        <button>Generate</button>
                    </Link>
                </div>
            ) : (
                <p>Loading profile data...</p>
            )}
        </div>
    );
}
