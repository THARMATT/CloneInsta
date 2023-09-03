import React,{useEffect,useState}from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
export default function Home() {

const navigate=useNavigate();
const [data, setData] = useState([])
  useEffect(()=>{
const token=localStorage.getItem("jwt")
if(!token){
  navigate("/signup")
}
//fetching all posts
fetch("http://localhost:5000/allposts" ,
 { headers: {
  
  "Authorization": "Bearer " + localStorage.getItem("jwt")

},}).then(res=>res.json()).then(result=>setData(result)).catch(err=>console.log(err))
  },[])
  return (
    <div>
    <div className="home">

      {/* card */}
      {data.map((posts)=>{
       return (<div className="card">
       {/* cardheader
  */}
  <div className="card-header">
   <div className="card-pic">
     <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L8bs33mJBAUBA01wBfJnjQHaHa%26pid%3DApi&f=1&ipt=5dd6e5ecf584144cff507e2485ef564c539477bfb551c31f2a3cfd67da9f91b0&ipo=images" alt="" />
     <h5>{posts.postedBy.name}</h5>
   </div>
  </div>
  {/* card-img  */}
  <div className="card-img">
   <img src={posts.photo} alt="" />
  </div>
  {/* card-content  */}
  <div className="card-content">
  <span className="material-symbols-outlined">
favorite
</span> 
<span className="material-symbols-outlined">
mode_comment
</span>
<span className="material-symbols-outlined">
send
</span>
<p> 1 Like</p>
<p>{posts.body}</p>

{/* add-comment  */}
<div className="add-comment">
<span className="material-symbols-outlined">
mood
</span>


<input type="text"  placeholder="add a comment"/>
<button type="button">POST</button>
</div>
  </div>
     </div>)
      })}
      
    </div>
    </div>
  )
}
