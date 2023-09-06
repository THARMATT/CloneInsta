import React, { useEffect, useState } from 'react';
import "./Profile.css";
import PostDeatail from './PostDetail';

export default function Profile() {
  const [posts, setPosts] = useState([]);
const[show, setShow]=useState(false);
const[pics,setPics]=useState([])

const toggleDetails = (pics) => {
  if (show) {
    setShow(false)
  }
  else {
    setShow(true)
    setPics(pics);

  }
}



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/myposts", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPosts(result);
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
            <img src="https://tse3.mm.bing.net/th?id=OIP.HRhauNP6-0u7QagwJu4PCgAAAA&pid=Api&P=0&h=180" alt="" />
          </div>
          {/* profile data */}
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info">
              <p>{posts.length} posts</p>
              {/* Replace these static numbers with dynamic data */}
              <p>500 followers</p>
              <p>400 following</p>
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
    { show &&  <PostDeatail item={pics} toggleDetails={toggleDetails}/>} 
    </div>
  );
}
