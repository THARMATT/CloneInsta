import React from 'react'
import"./signin.css";
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"
export default function Signin() {
  return (
    <div className="signin">
      <div>
        <div classname="loginform" id ="loginform">
          <img className="signinlogo" src={logo}/>
          <div>
            <input type="email" placeholder="Email" id="email"/>
          </div>
          <div>
            <input type="password" placeholder="Password" id="pswd"/>
          </div>
          <input type="submit" name="submit"  id="login-btn" value="Sign In"/>
        </div>
        <div className="login2">
          Don't have an account? <Link to="./signup"><span>Sign In</span> </Link>
        </div>
       
      </div>
    
    </div>
  )
}
