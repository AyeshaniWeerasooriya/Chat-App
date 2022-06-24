import React, {useContext} from 'react'
//import React from 'react';
import {Link} from 'react-router-dom';
import {auth, db} from "../firebase"
import "./NavBar.css";
import {signOut,onAuthStateChanged} from "firebase/auth"
import {updateDoc,doc} from "firebase/firestore"
//import {AuthContext} from '../Context/auth';
import { useNavigate } from 'react-router-dom';



function NavBar() {

    
     const navigate = useNavigate();
    //const {user}= useContext(AuthContext);
    const handleSignOut = async() =>{
        await updateDoc(doc(db,'users', auth.currentUser.uid), {

        isOnline: false,
        
        
        });
        await signOut(auth);
        navigate('/');

    }

    


    return (
        <nav>
            <h1>
                <Link to='/'>Chat App</Link>
            </h1>


            <div>
                 
                {auth.currentUser ? (
                     <>

                     <Link to='/profile'>Profile</Link>
                     <button className='btn' onClick={handleSignOut}>
                         Logout
                     </button>
 
                     </>
                  

                    
                ) : (
                  
                      
                    <>
                
                    <Link to='/register'>Register</Link>
                    <Link to='/'>Login</Link>
    
                    </>
                   

                )

            }
        
     
   


            </div>
        </nav>
    )
}

export default NavBar