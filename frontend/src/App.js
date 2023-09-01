
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </div>
      <ToastContainer theme="dark"/>
      </BrowserRouter>
  );
}

export default App;
