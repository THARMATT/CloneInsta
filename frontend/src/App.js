
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import React,{createContext,useState} from 'react';
import { LoginContext } from './context/LoginContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal'
import Createpost from './Screens/Createpost';
import UserProfile from './components/UserProfile';
import MyfollowingPost from './Screens/MyfollowingPost';
function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [userLogin,setUserLogin]=useState(false)
  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
        <Navbar login={userLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/createPost" element={<Createpost />}></Route>
          <Route path="/profile/:userid" element={<UserProfile />}></Route>
          <Route path="/followingpost" element={<MyfollowingPost />}></Route>
        </Routes>
       
      <ToastContainer theme="dark"/>
   {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
   </LoginContext.Provider>
      </div>
      </BrowserRouter>
  );
}

export default App;
