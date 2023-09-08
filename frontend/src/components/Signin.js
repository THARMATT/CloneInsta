import React,{useState,useContext} from 'react'
import"../CSS/signin.css";
import { Link ,useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Signin() {
  const {setUserLogin}=useContext(LoginContext)
  const navigate=useNavigate()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  // const [item, setitem] = useState("")
  // const jwt=require("jsonwebtoken");

  //TOAST Functions
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
const emailRegex=/.*@[a-z0-9.-]*/


const postData = () => {
  // Checking email
  if (!emailRegex.test(email)) {
    console.log("Invalid Credentials");
    notifyA("Invalid credentials");
    return;
  } else {
    console.log("email is ok");
  }

  // Sending data to the server
  fetch("http://localhost:5000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        notifyA(data.error);
      } else if (data.token) { // Check if the token field exists in the response
        notifyB("Signed In Successfully");
        console.log(data.token); //give token in console
        localStorage.setItem("jwt", data.token); 
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.user);
        setUserLogin(true)
        navigate("/");
      } else {
        notifyA("Token is missing in the response"); // Handle missing token
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      notifyA("An error occurred");
    });
};


  return (
    <div className="signin">
      <div>
        <div className="loginform" id ="loginform">
       
          <img className="signinlogo" src={logo}/>  
         
          <div>
            <input type="email" placeholder="Email"  value={email} id="email" onChange={(e)=>{setemail(e.target.value)}}/>
          </div>
          <div>
            <input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <input type="submit" name="submit"  id="login-btn" value="Sign In" onClick={()=>{postData()}}/>
       
        </div>
        
        <div className="login2">
          Don't have an account? <Link to="/signup"><span>Sign Up</span> </Link>
        </div>
       
      </div>
    
    </div>
  )
}
