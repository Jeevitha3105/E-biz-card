import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import convertToBase64 from './convertToBase64'
import Work from './Work'

export default function ProfileCreation() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    setValue("2");
  };
  
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/product/profile", {
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
      }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          console.log("Navigating to...");
          // navigate("/work");
        }
        // else {
        //   setError(res.data.message);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div>ProfileCreation</div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" />
              <Tab label="Works" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
              />
               <label>Title</label>
              <input
                type="text"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Company name</label>
              <input
                type="text"
                placeholder="company Name"
                onChange={(e) => setCompanyname(e.target.value)}
              />

              <label>Tagline</label>
              <input
                type="text"
                placeholder="Tagline"
                onChange={(e) => setTagline(e.target.value)}
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
              />
              <label>LinkedIn</label>
              <input
                type="text"
                placeholder="LinkedIn URL"
                onChange={(e) => setLinkedin(e.target.value)}
              />
              <label>Twitter</label>
              <input
                type="text"
                placeholder="Facebook URL"
                onChange={(e) => setTwitter(e.target.value)}
              />
              <label>Website</label>
              <input
                type="text"
                placeholder="Website URL"
                onChange={(e) => setWebsite(e.target.value)}
              />

              <h1>Contact details</h1>
              <label>Mobile No.</label>
              <input
                type="number"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
              />
              <label>Whatsapp</label>
              <input
                type="number"
                placeholder="Whatsapp"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
               <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setMail(e.target.value)}
              />
               <label>Address</label>
              <input
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />

              <p>Go on and complete filling your works</p>

              <button type="submit">Save</button>
              <button onClick={handleNext}>Next</button>
            </form>
          </TabPanel>

          <TabPanel value="2">

            <Work />

          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
