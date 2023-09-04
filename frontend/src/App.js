
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import React,{createContext,useState} from 'react';
import { LoginContext } from './context/LoginContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal'
import Createpost from './components/Createpost';
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
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/createPost" element={<Createpost />}></Route>
        </Routes>
       
      <ToastContainer theme="dark"/>
   {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
   </LoginContext.Provider>
      </div>
      </BrowserRouter>
  );
}

export default App;
