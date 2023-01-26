import { React, useState } from 'react'
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';

// add some extra details only to add some major inspectors
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  ConfirmPassword: ""
}

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  // Sign-In ===> signUp = false
  const [signUp, setsignUp] = useState(false);
  const { firstName, lastName, email, password, ConfirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const signUpStyle = {
    textDecoration: "none",
    cursor: "pointer"
  }

  const signInStyle = {
    textDecoration: "none",
    cursor: "pointer",
    color: "#298af2"
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      //SIGN-IN
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        setUser(user)
        setActive("home")
      }
      else {
        return toast.error("All fiels are Mandatory to Fill!")

      }

    } else {
      //SIGN UP
      if (password !== ConfirmPassword) {
        return toast.error("Password Dont Match")
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, { displayName: `${firstName} ${lastName}` })
        setActive("home")
      } else {
        return toast.error("All fiels are Mandatory to Fill!")
      }
    }
    navigate("/");
  }

  return (
    <div>
      <div className="AuthContainer">
        {/* HEADER-TEXT */}
        <div className="header-text">
          <h2>{signUp ? "Sign-Up" : "Sign-In"}</h2>
        </div>

        <div className="form-container form-criminalEntry">
          <form action="" onSubmit={handleAuth}>
            {/* FIRST NAME */}
            {signUp && (
              <>
                <div>
                  <input
                    type="text"
                    className="form-input form-name"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-input form-email"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            {/* EMAIL */}
            <div>
              <input
                type="email"
                className="form-input form-email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            {/* PASSWORD */}
            <div>
              <input
                type="password"
                className=" form-input form-password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            {/* ConfirmPASSWORD */}
            {signUp && (
              <div>
                <input
                  type="password"
                  className=" form-input form-password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  value={ConfirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* MAIN BUTTON */}
            <button
              className={`form-btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
              type="submit">
              {!signUp ? "Sign-in" : "Sign-Up"}
            </button>
          </form>
          {/* SIGN-IN AND SIGN-UP CHANGING */}
          {!signUp ?
            (
              <>
                <div className="Form-Footer">
                  <p className="">
                    Dont Have an Account? &nbsp;
                    <span
                      className=""
                      style={signUpStyle}
                      onClick={() => setsignUp(true)}>
                      Sign Up
                    </span>
                  </p>
                </div>
              </>
            )
            :
            (
              <div className="Form-Footer">
                <p className="">
                  Alreary Have an Account? &nbsp;
                  <span
                    style={signInStyle}
                    onClick={() => setsignUp(false)}>
                    Sign In
                  </span>
                </p>
              </div>
            )}
        </div>
      </div>

    </div>
  )
}

export default Auth