import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/Logo2.png"
// import Logo from "../images/Logo.png"


const Header = ({ active, setActive, user, handleLogout }) => {

    const userId = user?.uid;
    const displayName = user?.displayName;

    // ONLY THESE PEOPLE CAN ADD POLICE DETAILS{
    // "Director General of Police",
    // "Police Inspector",
    // "Assistant Police Inspector"}

    return (
        <div>
            <div className="navbar">
                <Link to="/">
                    <div
                        className={`logoContainer ${active === "home" ? "active" : ""}`}
                        onClick={() => setActive("home")}
                    >
                        {/* Logo */}
                        <img className="Logo" src={Logo} alt='Logo' />
                    </div>
                </Link>
                <div className="nav--items">
                    <Link to="/department">
                        <a className={`nav--item ${active === "department" ? "active" : ""}`}
                            onClick={() => setActive("department")}
                            href="">
                            Department
                        </a>
                    </Link>
                    <Link to="/Police">
                        <a className={`nav--item ${active === "department" ? "active" : ""}`}
                            onClick={() => setActive("department")}
                            href="">
                            Officers
                        </a>
                    </Link>
                    <Link to="/Criminals">
                        <a className={`nav--item ${active === "department" ? "active" : ""}`}
                            onClick={() => setActive("department")}
                            href="">
                            Criminals
                        </a>
                    </Link>
                    <Link to="/Category">
                        <a className={`nav--item ${active === "department" ? "active" : ""}`}
                            onClick={() => setActive("Category")}
                            href="">
                            Categery
                        </a>
                    </Link>

                    {/* {ONLY SHREYAS CAN ADD THE CRIMINAL DETAILS AS OF NOW} */}
                    {displayName == "Shreyas Prabhu" &&
                        <Link to="/AddPoliceDetails">
                            <a className={`nav--item ${active === "AddPoliceDetails" ? "active" : ""}`}
                                onClick={() => setActive("AddPoliceDetails")}
                                href="">
                                AddPoliceDetails
                            </a>
                        </Link>
                    }
                    {/* {ONLY SHREYAS CAN ADD THE CRIMINAL DETAILS AS OF NOW} */}
                    {displayName == "Shreyas Prabhu" &&
                        <Link to="/AddCriminalDetails">
                            <a className={`nav--item ${active === "AddCriminalDetails" ? "active" : ""}`}
                                onClick={() => setActive("AddCriminalDetails")}
                                href="">
                                AddCriminalDetails
                            </a>
                        </Link>
                    }

                    {/* SHOWING LOGO IF THE USER IS SIGNED IN ELSE THE LOGIN BUTTONS */}

                    {userId ? (<>
                        <div className="profile-header ">
                            <div className="profile-logo">
                                <img
                                    src="https://cdn.vectorstock.com/i/1000x1000/60/78/police-avatar-character-icon-vector-12646078.webp" alt="logo"
                                    className="profile-logo-header"
                                />
                            </div>
                            <p
                                className="profile-name-header"
                            >
                                {displayName}
                            </p>
                            {/* JAKE MADIDENE */}
                            <Link to="/">
                                <a className={`nav--item login-logout ${active === "department" ? "active" : ""}`}
                                    // onClick={() => setActive("department") }
                                    onClick={handleLogout}
                                    href="">
                                    Logout
                                </a>
                            </Link>
                        </div>
                    </>
                    )
                        :
                        (
                            <>
                                <Link to="/auth">
                                    <a className={`nav--item login-logout ${active === "department" ? "active" : ""}`}
                                        onClick={() => setActive("login")}
                                        href="">
                                        Login
                                    </a>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header

//LOGO -->HOME PAGE REDIRECT

// Police
// Categery
// Login