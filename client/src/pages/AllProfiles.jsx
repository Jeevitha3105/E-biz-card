import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllProfile() {
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/product/getAllProfiles",{ withCredentials: true });
                setProfile(response.data);
            
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        fetchData();
    }, []);
 
    // ---------------delete-------------------//
    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3000/product/deleteProfile/${id}`)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>console.log(err))
    }


    // works

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

     // ---------------delete-------------------//
     const handleDeleteWork = (id)=>{
        axios.delete(`http://localhost:3000/product/deleteWork/${id}`)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>console.log(err))
    }

    return (
        <div>
            {profile.map((profile)=>(
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

                <div style={{padding:"20px 0",display:"flex", flexDirection:"row", gap:"20px"}}>
               <Link to={`/editProfile/${profile._id}`}>
                    <button style={{width:"150px", backgroundColor:"pink", color:"black"}}>Edit Profile</button>
               </Link>  <br /><br />
                <button  style={{width:"150px", backgroundColor:"pink", color:"black"}} onClick={(e)=>handleDelete(profile._id)}>Delete profile</button>
                </div>
             
        {/* --------------------work component----------------- */}

                <div>
                    {works?.map((work) => (
                        <div key={work._id}>
                        <h1>{work.title}</h1>
                        <img src={work.cover} alt="Work Cover" />
                        <Link to={`/workDetails/${work._id}`}>
                            <button>Discover</button>
                        </Link>

                        <div style={{padding:"20px 0",display:"flex", flexDirection:"row", gap:"20px"}}>
                              <Link to={`/editWorks/${work._id}`}>
                                 <button style={{width:"70px", backgroundColor:"pink", color:"black"}}>Edit</button>
                              </Link>   <br /><br />
                                <button  style={{width:"70px", backgroundColor:"pink", color:"black"}} onClick={(e)=>handleDeleteWork(work._id)}>Delete</button>
                                </div>
                        </div>
                    ))}
                </div>

                <br /> <br />
                <hr />
            </div>
            ))}
        </div>
    );
}
