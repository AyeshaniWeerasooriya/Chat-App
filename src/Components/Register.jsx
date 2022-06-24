import React, {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc, Timestamp} from "firebase/firestore"
import NavBar from '../Common_Components/NavBar';
import "./Register.css"
import {auth,db} from "../firebase"
import { useNavigate } from 'react-router-dom';



function Register() {
    const [data, setData] =  useState({

        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,


    });

    const navigate = useNavigate();

    const {name,email,password,error,loading} = data;

    const handleChange = e =>{
        setData({...data, [e.target.name]: e.target.value })
    };



    const handleSubmit = async e =>{
        e.preventDefault();

        //before making a request for firebase set error as null & loading as true
        setData({...data, error:null, loading:true })


        //check the fields if there are empty setting the error message
        if(!name || !email || !password){
            setData({...data, error: "All fields are required"})
        }
        try {

            //registering the new user by using createUserWithEmailAndPassword
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            // once user registerd successfully setting that user information in firestore
            // below 'users' means collection name, like as MySQL table name
            // here we need document. So we need to set the document. here documet is user ID
            // firebase.firestore().collection('users').doc(id).set({}) = setDoc function

            await setDoc(doc(db, 'users',result.user.uid), {
                uid: result.user.uid,
                //these are the data will stored in document callsed user ID
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });

                
        


            // finally reset data again as before register a user
            setData({
                name:'', 
                email: '', 
                password: '', 
                error:null,
                loading: false,
            });

            navigate('/');


        } catch (error) {
            setData({...data, error: error.message, loading: false});
        }
    };







    return (
        <div>
          <NavBar/>
            <section>
                <h3>Create An Account</h3>


                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input_container">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} onChange={handleChange}/>

                        </div>

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
                            <button className='btn' disabled={loading}>
                                {loading ? 'Creating....' : 'Register'}
                            </button>
                        </div>
                    </form>


            </section>

        </div>
    )
}

export default Register;