import React,{useContext} from 'react';
import logo from "../images/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
export default function Navbar({login}) {
const {setModalOpen}=useContext(LoginContext);
    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login||token) {
            return (
                <>
                    <Link to="/profile"><li>Profile</li></Link>
                    <Link to="/createPost"><li>Add Post</li></Link>
                    <Link  style={{marginLeft:"0px"}}to="/followingpost"><li>My Following</li></Link>
                    <Link to={""}> <button className="primaryBtn" onClick={()=>{setModalOpen(true)}}>Log Out</button>
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

    return (
        <>
            <Link className="navbar" id="navbar" to="/">
                <img src={logo} alt="" />
                <ul className="nav-menu">
                    {loginStatus()}
                </ul>
            </Link>
        </>
    );
}
