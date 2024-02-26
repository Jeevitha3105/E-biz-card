import React, {useState,useEffect} from 'react';
import QRCode from 'qrcode.react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const SaveQR = () => {
    const {id}=useParams();
  const websiteURL = `http://localhost:5173/profileView/${id}`; 

  const [profile, setProfile] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
               const response= await axios.get('http://localhost:3000/product/getprofile',{ withCredentials: true });
                setProfile(response.data);
                console.log("Response Data:", response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        fetchData();
    }, [id]);

    const handleQRCodeSave = async () => {
      try {

        const imageData = document.getElementById("qrcode-id").toDataURL();
        const response = await axios.post('http://localhost:3000/product/qrcodes', {
          imageData,
          userId: profile._id,
          username: profile.username,
          companyname: profile.companyname,
          title: profile.title,
          address: profile.address,
          website: profile.website,
          emailId: profile.emailId,
          mobile: profile.mobile,
          whatsapp: profile.whatsapp,
        })
    
        console.log('Server response:', response);
    
        if (response.status === 201 && !response.data.error) {
          console.log('QR code, username, and companyname saved to backend');
          console.log("Navigating to /dashboard");
          navigate("/dashboard");
        } else {
          console.log('Server responded with an error:', response.data.message);
        }
    
      } catch (error) {
        console.error('Error saving QR code and user details:', error);
      }
      
    };

   

  return (
    <div>
      {/* Your component content here */}
      <h1>{profile.username}</h1>
      <h2>{profile.title}</h2>
      <h2>{profile.companyname}</h2>
      <h2>{profile.address}</h2>
      <h2>{profile.emailId}</h2>
      <h2>{profile.mobile}</h2>
      <h2>{profile.whatsapp}</h2>
      <h2>{profile.website}</h2>

      <QRCode id="qrcode-id" value={websiteURL} />
       
      <button onClick={handleQRCodeSave}>Save QR Code</button>
    </div>
  );
};

export default SaveQR;

