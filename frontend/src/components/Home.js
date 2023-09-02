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
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L8bs33mJBAUBA01wBfJnjQHaHa%26pid%3DApi&f=1&ipt=5dd6e5ecf584144cff507e2485ef564c539477bfb551c31f2a3cfd67da9f91b0&ipo=images" alt="" />
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
<span class="material-symbols-outlined">
mode_comment
</span>
<span class="material-symbols-outlined">
send
</span>
<p> 1 Like</p>
<p>this is amazing</p>
 
{/* add-comment  */}
<div className="add-comment">
<span class="material-symbols-outlined">
mood
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
