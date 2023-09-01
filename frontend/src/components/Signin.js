import React,{useState} from 'react'
import"./signin.css";
import { Link ,useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"
import { toast } from 'react-toastify';

export default function Signin() {
  const navigate=useNavigate()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")


  //TOAST Functions
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
const emailRegex=/.*@[a-z0-9.-]*/

  const postData=()=>{
    //checking email
  if(!emailRegex.test(email)){
    console.log("email kaa chkrr")
    notifyA("Invalid credentials")
    return
  }
 else{
  console.log("email is ok")
 }
  
  //sending data to server
  fetch("http://localhost:5000/signin",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      password:password,
      email:email
    })
  }).then(res=>res.json())
  .then(data=>{
    if(data.error){
    notifyA(data.error)}
    else{
      notifyB(data.message)
      navigate("/")
    }
    
    console.log(data)})
  }

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
