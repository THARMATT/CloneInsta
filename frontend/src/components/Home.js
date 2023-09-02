import React from 'react'
import "./Home.css"
export default function Home() {
  return (
    <div>
    <div className="home">

      {/* card */}
      <div className="card">
        {/* cardheader
   */}
   <div className="card-header">
    <div className="card-pic">
      <img src="https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
      <h5>Rohit</h5>
    </div>
   </div>
   {/* card-img  */}
   <div className="card-img">
    <img src="https://images.unsplash.com/photo-1692578824279-bbda6ca0bf34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
   </div>
   {/* card-content  */}
   <div className="card-content">
   <span className="material-symbols-outlined">
favorite
</span> 
<p>Like</p>
<p>this is amazing</p>
 
{/* add-comment  */}
<div className="add-comment">
<span className="material-symbols-outlined">
face_5
</span>
 <input type="text"  placeholder="add a comment"/>
 <button type="button">POST</button>
</div>
   </div>
      </div>
    </div>
    </div>
  )
}
