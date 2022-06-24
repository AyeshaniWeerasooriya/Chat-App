import { Routes, Route} from "react-router-dom"
import Home from "./Components/Home"
import Register from "./Components/Register"
import NavBar from "./Common_Components/NavBar";
import "./App.css";
import Login from "./Components/Login";
import AuthProvider from "./Context/auth";
import Profile from "./Components/Profile";
//import PrivateRoutes from "./Common_Components/PrivateRoutes";






function App() {
  return (
   
    <AuthProvider>
    <div className="App">
    
    
      <Routes>
                {/* <Route exact path='/' element={<PrivateRoutes/>}>
                      <Route exact path='/' element={<Home/>}/>
                </Route> */}


                
            <Route path="register" element={ <Register/> } />
            <Route path="navbar" element={<NavBar/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="/" element={ <Login/> } />
            <Route path="profile" element={ <Profile/> } />

      </Routes>
     
     
      
    </div>
    </AuthProvider>
    
  );
}



export default App;
