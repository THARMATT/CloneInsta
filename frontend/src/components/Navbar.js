import React, { useContext } from 'react';
import logo from "../images/logo.png";
import "../CSS/Navbar.css";
import { Link } from "react-router-dom";

import { LoginContext } from '../context/LoginContext';
export default function Navbar({ login }) {
 
   

    // Check if the current location is the signup or signin page
    // const loginPage = location.pathname === '/signup' || location.pathname === '/signin';


    const { setModalOpen } = useContext(LoginContext);
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return (
                <>
                    <Link to="/profile"><li>Profile</li></Link>
                    <Link to="/createPost"><li>Add Post</li></Link>
                    <Link style={{ marginLeft: "0px" }} to="/followingpost"><li>My Following</li></Link>
                    <Link to={""}> <button className="primaryBtn" onClick={() => { setModalOpen(true) }}>Log Out</button>
                    </Link>
                </>
            );
        } else {
            return (
                <>
                    <Link to="/signup"><li>SignUp</li></Link>
                    <Link to="/signin"><li>Signin</li></Link>

                </>
            );
        }
    }
    const loginStatusMobile = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return (
                <>
                    <Link to="/"><li><span className="material-symbols-outlined">
                        home
                    </span></li></Link>
                    <Link to="/profile"><li><span className="material-symbols-outlined">
                        account_circle
                    </span></li></Link>
                    <Link to="/createPost"><li><span className="material-symbols-outlined">
                        add_box
                    </span></li></Link>
                    <Link style={{ marginLeft: "0px" }} to="/followingpost"><li><span className="material-symbols-outlined">
                        explore
                    </span></li></Link>
                    <Link to={""}> <li onClick={() => { setModalOpen(true) }}><span className="material-symbols-outlined">
                        logout
                    </span></li>
                    </Link>
                </>
            );
        } else {
            return (
                <> <Link to="/signup"><li>SignUp</li></Link>
                <Link to="/signin"><li>Signin</li></Link>
                </>
            );
        }
    }


    return (
        <>
            <div className="navbar" id="navbar" to="/">
            <Link to="/"> <img src={logo} alt="" id="instalogo" /> </Link>
                <ul className="nav-menu">
                    {loginStatus()}
                </ul>
                <ul className="nav-mobile">
                    {loginStatusMobile()}
                </ul>
            </div>
        </>
    );
}
