import React from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

const YourComponent = () => {
    const {id}=useParams();
  const websiteURL = `http://localhost:5173/profileView/${id}`; // Replace this with the actual URL of your website

  return (
    <div>
      {/* Your component content here */}
      <QRCode value={websiteURL} />
    </div>
  );
};

export default YourComponent;
