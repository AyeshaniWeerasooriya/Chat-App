import React, {useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth";
import {updateDoc, doc} from "firebase/firestore"
import "./Login.css"
import {auth,db} from "../firebase"
import { useNavigate } from 'react-router-dom';
import NavBar from '../Common_Components/NavBar';



function Login() {
    const [data, setData] =  useState({
        email: '',
        password: '',
        error: null,
        loading: false,


    });

    const navigate = useNavigate();

    const {email,password,error,loading} = data;

    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value })
    };



    const handleSubmit = async e =>{
        e.preventDefault();

        //before making a request for firebase set error as null & loading as true
        setData({...data, error:null, loading:true })


        //check the fields if there are empty setting the error message
        if( !email || !password){
            setData({...data, error: "All fields are required"})
        }
        try {

            //registering the new user by using createUserWithEmailAndPassword
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            //We don't need set a document again for a login, because we have already set a document in firebase' firestor for storing data 
            //Now in the login function we have to update that document. 
            // // So that's why we use updateDoc function in firebase' firstore 
            // updateDoc=firebase.firestore().collection('users').doc(uid).update({})

            await updateDoc(doc(db, 'users',result.user.uid), {

                isOnline: true,
            });

              

            // finally reset data again as before login a user
            setData({
                email: '', 
                password: '', 
                error:null,
                loading: false,
            });

            navigate('/home');


        } catch (error) {
            setData({...data, error: error.message, loading: false});
        }
    };







    return (
        <div>
        <NavBar/>
            <section>
                <h3>Log In To Your Account</h3>


                    <form className="form" onSubmit={handleSubmit}>
                        
                        <div className="input_container">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleChange} />
                            
                        </div>

                        <div className="input_container">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handleChange}/>
                            
                        </div>

                        {error ? <p className='error'>{error}</p>:null}

                        <div className='btn_container'>
                            <button className='btn' disabled={loading}>{loading ? 'Logging in....' : 'Login'}</button>
                        </div>
                    </form>


            </section>

        </div>
    )
}

export default Login;