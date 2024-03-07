import React from 'react';
import banner from '../../assets/home1.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='md:px-6 px-4 max-w-screen-2xl mx-auto mt-16 sm:mt-24 section' id="home">
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
            <h2 className='md:text-4xl text-3xl font-bold text-white mb-6 leading-relaxed'>
              Welcome to Quikcard's Digital Business Hub!
            </h2>
            <p className='text-[#EBEBEB] text-lg mb-8'>
              Elevate Your Digital Presence. Connect Instantly, Showcase Effectively, and Navigate Your Professional World with Ease. In this innovative space, your eBusiness Card is more than an introduction; it's a dynamic portal to opportunities. Step into a realm where swift connections and impactful collaborations redefine the way you network.
            </p>
            <div>
             <Link to='/login'>
             <button className='button cursor-pointer'>
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
            <img src={banner} alt="banner" className='lg:h-[386px] md:h-[300px] w-full p-6 ' />
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
