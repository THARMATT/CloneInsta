import React from 'react'
import './Modal.css';
import { useNavigate } from 'react-router-dom';
import {RiCloseLine} from "react-icons/ri"
export default function Modal({setModalOpen}) {
    const navigate=useNavigate();
  return (
    <div className="darkBg" onClick={()=>setModalOpen(false)}>
    <div className='centered'>
      <div className="modal">
        <div className="modalHeader">
            <h5 className='heading'>Confirm</h5>
            <button type="button" className='closeBtn' onClick={()=>setModalOpen(false)}>
            <RiCloseLine></RiCloseLine></button>
        </div>
       
        {/* //modal content  */}
        <div className="modalContent">
            Are you really want to Logout?
        </div>
        <div className="modalActions">
            <div className="actionContainer">
                <button className="logOutBtn" onClick={()=>{
                    setModalOpen(false)
                    localStorage.clear()
                    navigate('/signin')
                }}>
                   Logout
                </button>
                <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
            </div>
        </div>
      </div>
    </div></div>
  )
}
