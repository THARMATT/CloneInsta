import React, { useEffect, useState } from 'react';
import "../CSS/Profile.css";
import PostDetail from '../components/PostDetail';
import ProfilePic from '../components/ProfilePic';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
const navigate=useNavigate();
var picLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
  const [posts, setPosts] = useState([]);
const[show, setShow]=useState(false);
const[pics,setPics]=useState([])
const[changePic,setChangePic]=useState(false)
const [user, setUser] = useState("")

const toggleDetails = (pics) => {
  if (show) {
    setShow(false)
  }
  else {
    setShow(true)
    setPics(pics);

  }
}

const handleChangeProfile = () => {
  if (changePic) {
    setChangePic(false);
  } else {
    setChangePic(true);
    
  }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPosts(result.post);
        setUser(result.user)
               
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <div className="profile">
        {/* profile frame */}
        <div className="profile-frame">
          <div className="profile-pic">
            <img
            onClick={handleChangeProfile} src= {user.Photo?user.Photo:picLink} alt="" style={{cursor:"pointer"}} />
          </div>
          {/* profile data */}
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info">
              <p>{posts?posts.length:"0"} posts</p>
              {/* Replace these static numbers with dynamic data */}
              <p> {user.followers?user.followers.length:"0"} followers</p>
              <p>{user.following?user.following.length:"0"} following</p>
            </div>
          </div>
        </div>
        <hr style={{ width: "90%", margin: "auto", opacity: "0.8" }} />
        {/* gallery */}
        <div className="gallery">
          {posts.map((post) => (
            // <img key={post._id} src={post.photo} onClick={()=>{toggleDetails(posts)}} className="item" alt={`Post by ${post.author}`} />
            <img
  key={post._id}
  src={post.photo}
  onClick={() => toggleDetails(post)}
  className="item"
  alt={`Post by ${post.author}`}
/>
          ))}
        </div>
      </div>
    { show &&  <PostDetail item={pics} toggleDetails={toggleDetails}/>} 
    {
      changePic && <ProfilePic handleChangeProfile={handleChangeProfile}/>
    }
    </div>
  )
}
