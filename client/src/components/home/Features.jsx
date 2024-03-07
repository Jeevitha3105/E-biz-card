import React from 'react';
import feature from '../../assets/feature.png';
import network from '../../assets/network.png';
import saving from '../../assets/saving.png';
import profile from '../../assets/profile-details.png';
import social from '../../assets/social.png';
import update from '../../assets/update.png';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

export default function Features() {
  return (
    <div className='my-12 md:px-6 px-4 max-w-screen-2xl mx-auto' id="features">
     <div className='flex flex-col gap-5'>

        {/* Feature Text */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className='w-full text-center'
        >
          <h3 className='text-xl md:text-3xl lg:text-3xl text-primary font-bold mb-3'>
            Explore the Power of QuikCard Features
          </h3>
          <p className='text-base md:text-lg lg:text-lg text-tartiary mb-4'>
            Unleash Seamless Connectivity, Effortlessly Showcase Your Skills, and Navigate Opportunities with Intuitive Innovation. 
            Discover the Tools Redefining Your Professional Journey.
          </p>
        </motion.div>

        {/* Features cards */}
        <div className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={profile} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Digital Showcase</h5>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={update} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Up-to-the-Minute Updates</h5>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={social} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Convenient to sharing</h5>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={network} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Streamlined Networking</h5>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={feature} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Mobile-Friendly Design</h5>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className='mb-4'
          >
            <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] shadow-3xl p-6 md:p-8 flex flex-col justify-center items-center hover:-translate-y-4 transition-all duration-300'>
              <img src={saving} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Cost-Effective Solution</h5>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
