import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { FaBars } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { Link as RouterLink} from "react-scroll";
import { Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Features", path: "features" },
    { link: "About", path: "about" },
    { link: "How it works", path: "howItWorks" },
  ];

  return (
    <>
    <nav className="bg-white px-4 md:px-8 lg:px-8 xl:px-14 max-w-screen-2xl mx-auto text-primary fixed top-0 right-0 left-0 py-5 border-b">
        <div className="text-lg container mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center space-x-4">
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

          {/* Navigation links for larger screens */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map(({ link, path }) => (
              <RouterLink
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                key={link}
                to={path}
                className="block hover:text-gray-300 cursor-pointer"
              >
                {link}
              </RouterLink>
            ))}
          </div>

          {/* Sign up and Login buttons for larger screens */}
          <div className="hidden md:flex space-x-4 items-center">
           <Link to="/signup">
                <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-primary">
                Sign up
                </button>
            </Link> 

            <Link to="/login">
                <button className="bg-secondary py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-primary">
                Login
                </button>
            </Link>
          </div>

          {/* Menu button for smaller screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-gray-300"
            >
              {isMenuOpen ? (
                <HiXMark className="text-primary w-6 h-6" />
              ) : (
                <FaBars className="text-primary w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive menu for smaller screens */}
      <div
        className={`space-y-4 px-4 pt-24 pb-5 md:pt-24 bg-secondary text-xl ${
          isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
        }`}
      >
        {navItems.map(({ link, path }) => (
          <RouterLink
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-80}
            key={link}
            to={path}
            className="block hover:text-gray-300 text-white"
            onClick={toggleMenu}
          >
            {link}
          </RouterLink>
        ))}
        <Link to="/login">
            <div className="flex flex-row gap-2 pt-3">
                <div>Login</div>
                <div className="mt-1"><LuLogIn /></div>
            </div>
        </Link>
       
      </div>
    </>
  );
}
