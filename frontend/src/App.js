 
import './App.css';
import{BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar"
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
<Navbar/>
<Routes>
 <Route path="/home" element={<Home/>}></Route> 
 <Route path="/signup" element={<Signup/>}></Route>
 <Route path="/profile" element={<Profile/>}></Route>
  <Route path="/signin" element={<Signin/>}></Route>
</Routes>
      </div></BrowserRouter>
  );
}

export default App;
