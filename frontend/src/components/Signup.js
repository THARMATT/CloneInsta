import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import logo from '../images/logo.png';
import "../CSS/signup.css"
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate=useNavigate()
const [name, setName] = useState("")
const [email, setemail] = useState("")
const [userName, setuserName] = useState("")
const [password, setPassword] = useState("")

//TOAST Functions
const notifyA=(msg)=>toast.error(msg)
const notifyB=(msg)=>toast.success(msg)
const passwordRegex=/^.*(?=.{7,50})(?=.*\d)(?=.*[A-Z]).*$/
const emailRegex=/.*@[a-z0-9.-]*/
const postData=()=>{
//checking email
if(!emailRegex.test(email)){
  console.log("email kaa chkrr")
  notifyA("Invalid credentials")
  return
}
else if(!passwordRegex.test(password)){
  notifyA('Please put a strong password')
  return
}

//sending data to server
fetch("http://localhost:5000/signup",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({

    name:name,
    userName:userName,
    password:password,
    email:email
  })
}).then(res=>res.json())
.then(data=>{
  if(data.error){
  notifyA(data.error)}
  else{
    notifyB(data.message)
    navigate("/signin")
  }
  
  console.log(data)})
}

  return (
    <div className='signup' id="signup" >
      <div className='form-container'>
        <img src={logo} id="signuplogo" alt='' />
        <p className='loginPara'>
          Sign Up to see photos and videos <br /> from your friends  </p>
        <div><input type="email" name="email" id="email" value={email} placeholder="Email" onChange={(e)=>{setemail(e.target.value)}} /></div>

        <div><input type="text" name="name" id="" placeholder="Full Name"  value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
        <div><input type="text" name="username" id="" placeholder="Username" value={userName} onChange={(e)=>{setuserName(e.target.value)}} /></div>
        <div><input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} /></div>


        <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
          By signing up,you agree to out Terms,<br />privacy policy and cookies policy.
        </p>
        <div><input type="submit" id="submit-btn" value="Sign Up"  onClick={()=>(postData())}/></div>
        <div className="form2">
        Already have an account?<Link to= "/signin" ><span>Sign in</span></Link>
      </div>
      </div>
      
    </div>
  )
}
 