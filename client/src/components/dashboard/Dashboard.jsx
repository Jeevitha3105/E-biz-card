import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShowQR from '../qrgeneration/ShowQR';
import Nav from './Nav';
import banner from '../../assets/dashboardimg.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';


export default function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [showQRData, setShowQRData] = useState(null);
  const [username, setUsername] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/verify', { withCredentials: true })
      .then(res => {
        console.log('Verification response:', res.data);
        if (res.data.status) {
          setUsername(res.data.username); // Extract and set the username
          axios.get('http://localhost:3000/product/getAllQRCodes')
            .then(qrData => {
              setShowQRData(qrData.data);
            })
            .catch(error => {
              console.error('Error fetching ShowQR data:', error);
            });
        } else {
          console.log('User not verified. Redirecting to home.');
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error verifying user:', error);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Add event listener to handle drawer state changes
    const handleDrawerState = () => {
      document.body.classList.toggle('overflow-hidden', isDrawerOpen);
    };

    // Attach event listener when the component mounts
    document.body.addEventListener('scroll', handleDrawerState);

    // Cleanup when the component unmounts
    return () => {
      document.body.removeEventListener('scroll', handleDrawerState);
    };
  }, [isDrawerOpen]);

  return (
    <div>
        <Nav username={username} data={showQRData} setIsDrawerOpen={setIsDrawerOpen}/>

        <div className='md:px-6 px-4 max-w-screen-2xl mx-auto mt-16 sm:mt-24 section'>
          <div className='gradientBg rounded-xl rounded-br-[100px] md:p-6 p-4 sm:py-8'>
            <div className='flex flex-col-reverse md:flex-row-reverse lg:flex-row justify-between items-center gap-8 sm:gap-10'>

              {/* banner content */}
              <motion.div 
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className='md:w-2/3 lg:w-3/5'
              >
                <h2 className='md:text-4xl text-3xl font-bold text-primary mb-6 leading-relaxed'>
                    Welcome, {username}!
                </h2>
                <p className='text-[#EBEBEB] text-lg mb-8'>
                Dive into a world where your professional identity shines brighter than ever. 
                Here, in your personal dashboard, you're not just a name in the crowd — you're the headline act. 
                Let's create, customize, and connect like never before. 
                Your journey to leaving a lasting digital impression starts now. 
                <br /><br />Welcome aboard to a seamless experience designed just for you!
                </p>
                <div>
                    <Link to="/profileCreation">
                    <button className={`button ${showQRData  !== null && showQRData .length > 0 ? "cursor-not-allowed" : "cursor-pointer"}`} 
                    disabled={showQRData !== null && showQRData.length > 0}>

                        <span>Create Your Card</span>
                    </button>
                    </Link>
                </div>
              </motion.div>

              {/* banner image */}
              <motion.div
                variants={fadeIn("down", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className='lg:w-2/5 md:w-1/3 w-full'
              >
                <img src={banner} alt="banner" className='lg:h-[386px] md:h-[300px] w-full p-6' />
              </motion.div>
              
            </div>
          </div>

              <ShowQR data={showQRData} /> 
        </div>
    </div>
  );
}
