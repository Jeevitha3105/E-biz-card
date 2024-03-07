import React from 'react'
import Navbar from '../components/home/Navbar'
import Home from '../components/home/Home'
import Features from '../components/home/Features'
import About from '../components/home/About'
import HowItWorks from '../components/home/HowItWorks'
import Footer from '../components/home/Footer'
export default function Landing() {
  return (
    <div>
    <Navbar />
    <Home />
    <Features />
    <About />
    <HowItWorks />
    <Footer />
</div>
 
  )
}
