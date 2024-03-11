import React, { useState, useEffect } from 'react';
import Logo from "../../assets/Logo.png";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import avatar from '../../assets/avatar.png'
import { Drawer } from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function Nav({ username,data}) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleClose = () => {
    setDrawerOpen(false);
  };

  console.log(data);

  useEffect(() => {
    const body = document.body;
    if (isDrawerOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }

    return () => {
      body.style.overflow = 'visible';
    };
  }, [isDrawerOpen]);

  const navigate = useNavigate();

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

  return (
    <>
      <nav className="bg-white px-4 md:px-8 lg:px-8 xl:px-14 max-w-screen-2xl mx-auto text-primary fixed top-0 right-0 left-0 py-5 border-b">
        <div className="text-lg container mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center space-x-4 ">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center justify-center space-x-3 text-primary"
            >
              <img
                src={Logo}
                alt="logo"
                className="w-10 inline-block items-center"
              />
              <span className="text-secondary">QUIKCARD</span>
            </a>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/profileCreation">
            <button className={`bg-secondary py-2 px-4 transition-all duration-300 rounded font-bold hover:text-white ${data !== null && data.length > 0 ? "bg-purple-300 cursor-not-allowed" : "hover:bg-primary cursor-pointer"}`} 
            disabled={data !== null && data.length > 0}
            >
                ADD
              </button>
            </Link>
              
              <Menu >
                <MenuHandler>
                  <Button className="bg-secondary py-2 px-4 transition-all duration-300 rounded text-primary hover:text-white hover:bg-primary">Settings</Button>
                </MenuHandler>
                <MenuList className='mt-4 py-3 rounded-2xl'>
                  <MenuItem>
                  <Link to='/forgotPassword'>
                    <div className='py-3 px-5 hover:text-gray-500'>
                        <button className='text-lg'>Change Password</button>
                    </div>
                </Link>
                </MenuItem>
                <hr className='shadow'/>
                  <MenuItem>
                    <div className='py-3 px-5 hover:text-gray-500' onClick={()=>{handleLogout();}}>
                      <button className='text-lg'>Logout</button>
                    </div> 
                  </MenuItem>
                  
                </MenuList>
              </Menu>

          </div>
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-white focus:outline-none focus:text-gray-300"
            >
              {isDrawerOpen ? (
                <HiXMark className="text-primary w-6 h-6" onClose={toggleClose} />
              ) : (
                <FaBars className="text-primary w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isDrawerOpen && (
        <Drawer open={isDrawerOpen} placement="right" style={{height:"100vh"}}>
          {/* Add your Drawer content here */}
          <div className='mt-20 pt-10 '>
            <div className='flex flex-col items-center justify-center'>
                <img src={avatar} alt='profile' className='w-14 h-14 rounded-full'/>
                <h1 className='text-2xl text-primary pt-5 font-bold'>{username}</h1>
            </div>

            <div className='pt-10 flex flex-col gap-y-7'>
                <div className='flex flex-row gap-3 items-center pl-10 lineShadow py-3' onClick={() => {toggleClose();}}>
                    <MdHome className='w-7 h-7'/>
                    <h1 className='text-xl'>Home</h1>
                </div>

                <Link to="/allProfiles">
                    <button disabled={(Array.isArray(data) && data.length === 0)} className='flex flex-row gap-3 items-center pl-10 lineShadow py-3 w-full'>
                        <FaUserEdit className='w-7 h-7'/>
                        <h1 className='text-xl'>Edit profile</h1>
                    </button>
                </Link>

                <Link to='/forgotPassword'>
                    <div className='flex flex-row gap-3 items-center pl-10 lineShadow py-3'>
                        <IoIosSettings className='w-7 h-7 '/>
                        <h1 className='text-xl'>Change Password</h1>
                    </div>
                </Link>
            </div>

            <div className='flex flex-row gap-3 items-center pl-10 mt-[300px]' onClick={()=>{handleLogout();}}>
                    <IoLogOut className='w-10 h-10'/>
                    <button className='text-2xl'>Logout</button>
            </div> 
          </div>
        </Drawer>
      )}
    </>
  );
}
