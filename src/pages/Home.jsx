import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import VisionAndMission from '../components/VisionAndMission'
import AboutPolice from '../components/AboutPolice'
import image from '../images/Police/1.png'
import ScrollToTop from '../utility/ScrollToTop'


const Home = () => {
  return (
    <div>
      <ScrollToTop />

      <div className="homeContainer">
        <div className="homeLeftConatiner">
          <span className="homeBodyHeadingText">
            24/7 EMERGENCY CALL
          </span>
          <span className="mainBodyText">
            We Protect And <br />
            Serve Our Citizen<br />
          </span>
          <span className="mainBodyFooterText">
            An unwavering Commitment to integrity, the rule of law, human rights, dignity and respect for the Individual. An unrelenting pursuit of professional excellence, people-centric practices, good governance, transparency and accountability. A culture of inquiry and critical thinking.
          </span>
          <Link to="department">
            <button className='homeBtn'>Explore Department</button>
          </Link>
        </div>
        <div className="homeRightConatiner">
          <img className='homeRightImage' src={image} alt="" />
        </div>
      </div>
      {<AboutPolice />}
      <VisionAndMission />
    </div>
  )
}

export default Home