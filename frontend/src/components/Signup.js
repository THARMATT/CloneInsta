import React,{useEffect} from 'react'
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import "./signup.css"
export default function Signup() {
  const fetchData=async()=>{
    const response=await fetch("http://localhost:5000/");
    const data=await response.json()
    console.log(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='signup' id="signup" >
      <div className='form-container'>
        <img src={logo} id="signuplogo" alt='' />
        <p className='loginPara'>
          Sign Up to see photos and videos <br /> from your friends  </p>
        <div><input type="email" name="email" id="email" placeholder="Email" /></div>

        <div><input type="text" name="name" id="" placeholder="Full Name" /></div>
        <div><input type="text" name="username" id="" placeholder="Username" /></div>
        <div><input type="password" name="password" id="password" placeholder="password" /></div>


        <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
          By signing up,you agree to out Terms,<br />privacy policy and cookies policy.
        </p>
        <div><input type="submit" id="submit-btn" value="Sign Up" /></div>
        <div className="form2">
        Already have an account?<Link to= "/signin" ><span>Sign in</span></Link>
      </div>
      </div>
      
    </div>
  )
}
 