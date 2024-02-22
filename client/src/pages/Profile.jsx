import React, { useEffect, useState } from 'react';
import WorkComponent from '../components/profile/WorkComponent';
import axios from 'axios';
import YourComponent from '../components/YourComponent';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/product/getprofile",{ withCredentials: true });
                setProfile(response.data);
            
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <div key={profile._id}>
                <img src={profile.banner} alt='banner image' />
                <img src={profile.logo} alt='Logo image' />
                <h1>{profile.username}</h1>
                <h4>{profile.companyname}</h4>
                <p>{profile.tagline}</p>
                <p>{profile.description}</p>

                <div>
                    <a href={profile.instagram}>
                        <p>Instagram</p>
                    </a>
                    <a href={profile.linkedin}>
                        <p>LinkedIn</p>
                    </a>
                    <a href={profile.twitter}>
                        <p>Twitter</p>
                    </a>
                    <a href={profile.website}>
                        <p>Website URL</p>
                    </a>
                </div>

                <div>
                    <h2>{profile.mobile}</h2>
                    <h2>{profile.whatsapp}</h2>
                </div>
            
                <div>
                    <WorkComponent />
                </div>
                <Link to={`/Qrcode/${profile._id}`}><button>Generate</button></Link>
            </div>
        </div>
    );
}
