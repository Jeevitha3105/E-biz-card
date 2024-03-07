import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import create from '../../assets/create.png';
import save from '../../assets/save.png';
import share from '../../assets/share.png';

export default function HowItWorks1() {
  return (
    <div className='my-12 md:px-6 px-4 max-w-screen-2xl mx-auto section' id="howItWorks">
     <div className='flex flex-col gap-5'>

        {/* Feature Text */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className='w-full text-center'
        >
          <h3 className='text-xl md:text-3xl lg:text-3xl text-primary font-bold mb-3'>
            Its all about how it works
          </h3>
          <p className='text-base md:text-lg lg:text-lg text-tartiary mb-4'>
            Revolutionizing Networking with Our eBusiness Card
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
              <img src={create} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Create Your Digital Profile</h5>
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
              <img src={save} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Save Your Digital Card</h5>
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
              <img src={share} alt="feature" className='w-[150px] md:w-[200px] mb-2 h-36 md:h-48 object-cover' />
              <h5 className='text-xl md:text-2xl lg:text-2xl font-semibold text-primary px-4 text-center mt-2'>Share with Ease</h5>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
