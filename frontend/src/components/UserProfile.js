import React, { useEffect, useState } from 'react';
import "../CSS/Profile.css";

import { useParams } from 'react-router-dom';
// import { set } from 'mongoose';
export default function UserProfile() {
    var picLink="https://cdn-icons-png.flaticon.com/128/64/64572.png"
    const [post, setPost] = useState([]);
    const [user, setUser] = useState("");
const [isFollow, setIsFollow] = useState(false)
    const { userid } = useParams()
    console.log(userid)
//followuser

const followUser=(userId)=>{
fetch("http://localhost:5000/follow",{

method:"put",
headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  },
  body:JSON.stringify({
    followId:userId
  })
})
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    setIsFollow(true)
})
}
//unfollow function
const unfollowUser=(userId)=>{
    fetch("http://localhost:5000/unfollow",{
    
    method:"put",
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body:JSON.stringify({
        followId:userId
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        setIsFollow(false)
    })
    }
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${userid}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setUser(result.user)
                setPost(result.post);
                if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id))
                {
                    setIsFollow(true)
                
            } }catch (error) {
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
                        <img src={user.Photo? user.Photo:picLink} alt="" />
                    </div>
                    {/* profile data */}
                    <div className="profile-data">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <h1>{user.name}</h1>
                            <button className="followBtn" onClick={()=>{
                                if(isFollow){
                                    unfollowUser(user._id)
                                }else{
                                followUser(user._id)}}}>{isFollow?"Unfollow":"Follow"}</button>
                            </div>
                        <div className="profile-info">
                            <p>{post.length} post</p>
                            {/* Replace these static numbers with dynamic data */}
                            <p>{user.followers?user.followers.length:"0"} followers</p>
                            <p>{user.following?user.following.length:"0"} following</p>
                        </div>
                    </div>
                </div>
                <hr style={{ width: "90%", margin: "auto", opacity: "0.8" }} />
                {/* gallery */}
                <div className="gallery">
                    {post.map((post) => (
                        // <img key={post._id} src={post.photo} onClick={()=>{toggleDetails(post)}} className="item" alt={`Post by ${post.author}`} />
                        <img
                            key={post._id}
                            src={post.photo}
                            //   onClick={() => toggleDetails(post)}
                            className="item"
                            alt={`Post by ${post.author}`}
                        />
                    ))}
                </div>
            </div>
            {/* { show &&  <PostDeatail item={post} toggleDetails={toggleDetails}/>}  */}
        </div>
    );
}
