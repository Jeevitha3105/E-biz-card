import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { Link, useParams } from 'react-router-dom';

const ShowQR = () => {
    const [qrCodes, setQRCodes] = useState([]);
    const [hoveredQR, setHoveredQR] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/getAllQRCodes');
                setQRCodes(response.data);
            } catch (error) {
                console.error('Error fetching QR codes:', error);
            }
        };

        fetchData();
    }, []);

    const handleDownload = async (qrCode) => {
        try {
            const canvas = await html2canvas(document.getElementById(`qrCode-${qrCode._id}`));
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `qr_code_${qrCode._id}.png`;
            link.click();
        } catch (error) {
            console.error('Error creating image:', error);
        }
    };

    const {email} = useParams();
    const handleDelete = async () => {
        console.log('User Email:', email); // Add this line to check userEmail
        try {
          await axios.delete(`http://localhost:3000/product/deleteAllData/${email}`);
          console.log('User data deleted successfully');
          window.location.reload();
          // Optionally, you can trigger any additional actions or updates on the frontend
        } catch (error) {
          console.error('Error deleting user data:', error);
        }
      };
      
      

    return (
        <div>
            <h1>QR IMAGES</h1>
            
            {qrCodes.map((qrCode) => (
                <div 
                    key={qrCode._id} 
                    id={`qrCode-${qrCode._id}`}
                    onMouseEnter={() => setHoveredQR(qrCode._id)}
                    onMouseLeave={() => setHoveredQR(null)}
                >
                    <div style={{ display: "flex", flexDirection: "row", height: "auto", width: "500px", backgroundColor: "bisque", justifyContent: "space-between" }}>
                        <div>
                            <p>{qrCode.username}</p>
                            <p>{qrCode.title}</p>
                            <p>{qrCode.companyname}</p>
                            <p>{qrCode.address}</p>
                            <p>{qrCode.emailId}</p>
                            <p>{qrCode.mobile}</p>
                            <p>{qrCode.whatsapp}</p>
                            <p>{qrCode.website}</p>
                        </div>
                        <div>
                            <img src={qrCode.imageData} alt={`QR Code - ${qrCode._id}`} style={{ height: "100px", width: "100px" }} />
                        </div>
                    </div>
                    <br /> <br />
                    {hoveredQR === qrCode._id && (
                        <button onClick={() => handleDownload(qrCode)}>Download QR Code</button>
                    )}

                   <Link to='/allProfiles'><button>Edit</button></Link> 
                   <button onClick={handleDelete}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default ShowQR;
