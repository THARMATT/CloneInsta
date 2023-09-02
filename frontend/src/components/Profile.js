import React from 'react'
import "./Profile.css"
export default function Profile() {
  return (
    <div>
    <div className="profile">
      {/* profile frame  */}
      <div className="profile-frame">
        <div className="profile-pic">
          <img src="https://tse3.mm.bing.net/th?id=OIP.HRhauNP6-0u7QagwJu4PCgAAAA&pid=Api&P=0&h=180" alt="" />
        </div>
        {/* profie-data  */}
        <div className="profile-data">
          <h1>Lavish</h1>
          <div className="profile-info">
            <p>2 posts</p>
            <p>500 followers</p>
            <p>400 following</p>
          </div>
        </div>
      </div>
      <hr  style={{width:"90%",margin:"auto",opacity:"0.8"}}/>
      {/* gallery */}
      <div className="gallery">
<img src="https://images.unsplash.com/photo-1693393075815-bf4f5895e40f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80" alt="" />
<img src="https://images.unsplash.com/photo-1693432396195-75261a69ab49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" alt="" />
<img src="https://images.unsplash.com/photo-1692455151728-85b49a956d45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80" alt="" />
<img src="https://images.unsplash.com/photo-1693262043401-26bad9a1c91b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1919&q=80" alt="" />
<img src="https://images.unsplash.com/photo-1692556214687-f870f1e88d3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
<img src="https://images.unsplash.com/photo-1693074446829-5ab7b5bdd6e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
      </div>
    </div>
    </div>
  )
}
