import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
import ShowQR from '../qrgeneration/ShowQR';

export default function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [showQRData, setShowQRData] = useState(null);

  useEffect(()=>{
      axios.get('http://localhost:3000/auth/verify', { withCredentials: true })
      .then(res=>{
        console.log('Verification response:', res.data);
          if(res.data.status){
            axios.get('http://localhost:3000/product/getAllQRCodes')
            .then(qrData => {
              setShowQRData(qrData.data);
            })
            .catch(error => {
              console.error('Error fetching ShowQR data:', error);
            });
          }else{
            console.log('User not verified. Redirecting to home.');
              navigate('/')
          }
      }) 
      .catch(error => {
        console.error('Error verifying user:', error);
      });
  }, [navigate])

  return (
    <div>
      <h1>Dashboard</h1>

      <Link to="/profileCreation">
        <button disabled={showQRData !== null && showQRData.length > 0}>Create card</button>
      </Link>
      <br /> <br />

      <ShowQR data={showQRData} />

      <Link to="/allProfiles">
        <button disabled={(Array.isArray(showQRData) && showQRData.length === 0)}>View all card</button>
      </Link>

    </div>
  )
}