import React from 'react'
import { Link } from 'react-router-dom'
// import Logo from "../images/Logo.png"
import Logo from "../images/Logo2.png"


const Footer = ({ active, setActive, user, }) => {
    return (
        <div className='footeMainContainer'>
            <div className="footerConatiner">
                <div className="footerElement">
                    <div className="F-footerHeader">Quick Links</div>
                    <div className="F-footerContent">
                        <Link to="/department">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("department")}
                                href="">
                                Department
                            </a>
                        </Link>
                        <Link to="/Police">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("department")}
                                href="">
                                Officers
                            </a>
                        </Link>
                        <Link to="/Criminals">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("department")}
                                href="">
                                Criminals
                            </a>
                        </Link>
                        <Link to="/Category">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("Category")}
                                href="">
                                Categery
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="footerElement">
                    <div className="F-footerHeader">Other Pages</div>
                    <div className="F-footerContent">
                        <Link to="/">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("home")}
                                href="">
                                Priavcy Policy
                            </a>
                        </Link>
                        <Link to="/">
                            <a className={`F-list ${active === "department" ? "active" : ""}`}
                                onClick={() => setActive("home")}
                                href="">
                                Terms and Condition
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="footerElement ">
                    <div className="F-footerHeader">Contact Info</div>
                    <div className="F-footerContent F-ContactUs">
                        <div className="F-list">Police Station Rd, near Manjeshwar, Hosabettu,</div>
                        <div className="F-list">(+91) 04998272640</div>
                        <div className="F-list">support@KarnatakaPolice.com</div>
                        <div className="F-list">Mon - Fri : 9:00 am - 5:00 pm</div>
                    </div>
                </div>
                <div className="footerElement">
                    <div className="F-footerHeader">Emergency Call</div>
                    <div className="F-footerContent">
                        <div className="F-emergencyDesc">Feel Free To Contact Us</div>
                        <div className="F-emergencyCard">
                            <div className="F-emergencyCardIcon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6 F-phoneIcon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                </svg>
                            </div>
                            <div className="F-emergencyCardNumber">(100)   One - Zero - Zero</div>
                        </div>
                    </div>
                </div>
                <break></break>
                <Link to="/">
                    <div
                        className={`logoContainer F-logoContainer   ${active === "home" ? "active" : ""}`}
                        onClick={() => setActive("home")}
                    >
                        {/* Logo */}
                        <img className="Logo" src={Logo} alt='Logo' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Footer