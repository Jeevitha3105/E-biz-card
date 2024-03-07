import React from 'react'
import Logo from "../../assets/Logo.png";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";

export default function Footer() {
  return (
    <div className='bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white'>
        <div className='my-12 flex flex-col md:flex-row gap-10'>
            <div className='md:w-1/2 space-y-8'>
                <a href='/' className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                    <img src={Logo} alt="logo" className='w-10 inline-block items-center'/><span className='text-secondary'>QUIKCARD</span>
                </a>
                <p className='md:w-1/2'>Connect with Us: Dive into our digital community for real-time updates, industry insights, and exclusive content. Crafted with precision by QuikCard, where innovation meets connection.</p>
                
            </div>

            <div className='md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start'>
               <div className='space-y-4 mt-5'>
                    <h4 className='text-xl'>Platforms</h4>
                    <ul className='space-y-3'>
                        <a href='/' className='block hover:text-gray-300'>Home</a>
                        <a href='/' className='block hover:text-gray-300'>Features</a>
                        <a href='/' className='block hover:text-gray-300'>About</a>
                        <a href='/' className='block hover:text-gray-300'>How it works</a>
                    </ul>
               </div> 
               <div className='space-y-4 mt-5'>
                    <h4 className='text-xl'>Contact us</h4>
                    <ul className='space-y-3'>
                        <a href='/' className='block hover:text-gray-300'>(012) 1234-5678</a>
                        <a href='/' className='block hover:text-gray-300'>123 xyz xyz</a>
                        <a href='/' className='block hover:text-gray-300'>Tamilnadu,India</a>
                        <a href='/' className='block hover:text-gray-300'>600987</a>
                    </ul>
               </div> 
               
            </div>
           
        </div>

        <hr />
        <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8'>
            <p>@QUIKCARD 20XX --- 20XX All rights reserved.</p>
            <div className='flex items-center space-x-3'>
                <FaGithub className='w-7 h-7 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                <FaTwitter className='w-7 h-7 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                <SiGmail className='w-7 h-7 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                <TfiLinkedin className='w-7 h-7 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
            </div>
        </div>
    </div>
  )
}
