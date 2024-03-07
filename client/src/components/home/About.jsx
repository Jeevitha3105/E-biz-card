import React from 'react'
import banner from '../../assets/about.png'
import {motion} from 'framer-motion'
import { fadeIn } from '../variants'
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className='md:px-6 px-4 max-w-screen-2xl mx-auto mt-16 sm:mt-24 section' id="about">
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
            <h2 className=' text-4xl font-bold text-white mb-6 leading-relaxed'>
             Navigating the Future of Networking with Our eBusiness Card
            </h2>
            <p className='text-[#EBEBEB] text-lg mb-8 indent-10'>
              
              Step into the future of professional networking with our innovative eBusiness Card. More than a virtual introduction, it's a dynamic bridge between technology and connection. Our vision is to transform the way individuals and businesses connect in the digital landscape. Powered by cutting-edge technologies, our eBusiness Card boasts intuitive interfaces and interactive features for a memorable networking experience. Embracing sustainability, we've made the shift to digital, reducing environmental impact. 
            </p>
            <div>
              <Link to='/login'>
              <button className='button cursor-pointer'>
                <span>Get started</span>
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
            <img src={banner} alt="banner" className='lg:h-[386px] md:h-[386px] w-full p-6' />
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
