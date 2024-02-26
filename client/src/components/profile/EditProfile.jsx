import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import convertToBase64 from './convertToBase64'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

export default function EditProfile() {
  const {id} = useParams();
  const websiteURL = `http://localhost:5173/profileView/${id}`; 
  


  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState(null);
  const [logo, setLogo] = useState(null);

  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [emailId, setMail] = useState("");
  const [address, setAddress] = useState("");
 
  // const {id} = useParams();
  const navigate = useNavigate();


  useEffect(() => {

  console.log("useEffect is running");
  axios
    .get(`http://localhost:3000/product/getProfile/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log("Full response:", res);
      console.log("Response data:", res.data);
    
        setUsername(res.data.username);
        setCompanyname(res.data.companyname);
        setTagline(res.data.tagline);
        setDescription(res.data.description);
        setBanner(res.data.banner);
        setLogo(res.data.logo);
        setInstagram(res.data.instagram);
        setTwitter(res.data.twitter);
        setLinkedin(res.data.linkedin);
        setWebsite(res.data.website);
        setMobile(res.data.mobile);
        setWhatsapp(res.data.whatsapp);
        setTitle(res.data.title);
        setMail(res.data.emailId)
        setAddress(res.data.address);
      
    })
    .catch((err) => {
      console.log(err);
    });
}, [id]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .patch(`http://localhost:3000/product/updateProfile/${id}`, {
  //       username,
  //       title,
  //       companyname,
  //       tagline,
  //       description,
  //       banner,
  //       logo,
  //       instagram,
  //       twitter,
  //       linkedin,
  //       website,
  //       mobile,
  //       whatsapp,
  //       emailId,
  //       address,
  //     }, { withCredentials: true })
  //     .then((res) => {
  //       console.log("response", res);
  //       if (res.data.status) {
  //         console.log("Navigating to /profileView");
  //         navigate("/allProfiles");

         
  //       }
  //       // else {
  //       //   setError(res.data.message);
  //       // }
       
  //       })
     
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Update profile data
      const updateProfileResponse = await axios.patch(
        `http://localhost:3000/product/updateProfile/${id}`,
        {
          username,
          title,
          companyname,
          tagline,
          description,
          banner,
          logo,
          instagram,
          twitter,
          linkedin,
          website,
          mobile,
          whatsapp,
          emailId,
          address,
        },
        { withCredentials: true }
      );
  
      // Check if profile update was successful
      if (updateProfileResponse.data.status) {
        console.log("Profile updated successfully");

        const imageData = document.getElementById("qrcode-id").toDataURL();
  
        // Update QR code data
        const updateQRCodeResponse = await axios.post(
          'http://localhost:3000/product/qrcodes',
          {
            imageData,
            userId: id,
            username,
            companyname,
            title,
            address,
            website,
            emailId,
            mobile,
            whatsapp,
          }
        );
  
        // Check if QR code update was successful
        if (updateQRCodeResponse.status === 201 && !updateQRCodeResponse.data.error) {
          console.log('QR code, username, and companyname updated in /qrcodes');
          console.log("Navigating to /allProfiles");
          navigate("/allProfiles");
        } else {
          console.log('Server responded with an error:', updateQRCodeResponse.data.message);
        }
      } else {
        console.log("Error updating profile:", updateProfileResponse.data.message);
      }
    } catch (error) {
      console.error('Error updating profile and QR code details:', error);
    }
  };

  



  const onUploadBanner = async e =>{
    const base64= await convertToBase64(e.target.files[0]);
    setBanner(base64);
  }
  const onUploadLogo = async e =>{
    const base64= await convertToBase64(e.target.files[0]);
    setLogo(base64);
  }

  // max limit 

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
    <>
      <div>Edit Profile</div>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
               <label>title</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              <label>Company name</label>
              <input
                type="text"
                placeholder="company Name"
                onChange={(e) => setCompanyname(e.target.value)}
                value={companyname}
              />

              <label>Tagline</label>
              <input
                type="text"
                placeholder="Tagline"
                onChange={(e) => setTagline(e.target.value)}
                value={tagline}
              />

              <label>Description</label>
              <textarea
                type="text"
                placeholder="Description"
                // onChange={(e) => setDescription(e.target.value)}
                onChange={handleInputChange}
                rows={4}
                cols={50}
                value={description}
              />
              {isInputExceededLimit && (
                <p style={{ color: "red" }}>
                  Word limit exceeded! Maximum {maxCharacters} words allowed.
                </p>
              )}

              <label htmlFor="profile">Logo</label>
               <img src={logo}  />
              <input type="file" id='profile' name="profile" onChange={onUploadLogo}/>

              <label htmlFor="profile">Banner image</label>
              <img src={banner}  />
              <input type="file" id='profile' name='profile' onChange={onUploadBanner} />
            

              <h1>Social media links</h1>
              <label>Instagram</label>
              <input
                type="text"
                placeholder="Instagram URL"
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
              <label>LinkedIn</label>
              <input
                type="text"
                placeholder="LinkedIn URL"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
              <label>Twitter</label>
              <input
                type="text"
                placeholder="Facebook URL"
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
              />
              <label>Website</label>
              <input
                type="text"
                placeholder="Website URL"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
              />

              <h1>Contact details</h1>
              <label>Mobile No.</label>
              <input
                type="number"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
              <label>Whatsapp</label>
              <input
                type="number"
                placeholder="Whatsapp"
                onChange={(e) => setWhatsapp(e.target.value)}
                value={whatsapp}
              />
               <label>Email</label>
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setMail(e.target.value)}
                value={emailId}
              />
               <label>Address</label>
              <input
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />

<QRCode id="qrcode-id" value={websiteURL} />

              <button type="submit">Save Changes</button>
            </form>
    </>
  );
}
