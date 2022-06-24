import React, {useState, useEffect} from "react";
import Camera from "../Common_Components/SVG/Camera";
// import Camera from "../Common_Components/SVG/Camera";
import Img from '../Images/image_two.jpg';
import "./Profile.css";
import {storage, db, auth} from "../firebase";
import {ref, getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage';
import {getDoc, doc, updateDoc} from 'firebase/firestore';

import Delete from "../Common_Components/SVG/Delete";
import { useNavigate } from 'react-router-dom';




function Profile(){

    const [img, setImg] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate("");
   


    useEffect(()=> {
        getDoc(doc(db, 'users' , auth.currentUser.uid )). then(docSnap =>{
            if(docSnap.exists){
                setUser(docSnap.data());
            }
        });


        if(img){
            const uploadImg= async() =>{
                const imgRef=ref(
                    storage, 
                    `profil_pic/${new Date().getTime()}  - ${img.name}`
                    );

                    try{

                        if(user.profil_picPath){
                            await deleteObject(ref(storage, user.profil_picPath));
                        }

                        const snap= await uploadBytes(imgRef, img);
                        const url= await getDownloadURL(ref(storage, snap.ref.fullPath));


                        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                            profil_pic: url,
                            profil_picPath: snap.ref.fullPath
                        });
                        console.log(url)
                        setImg(" ");


                    }catch (err){

                        console.log(err.message)
                    }

                    

                    // console.log(snap.ref.fullPath)
                    // console.log(url)
            };

            uploadImg();
        }
    }, [img]);


        const deleteImage= async() =>{

            try{
                const confirm = window.confirm('Delete Profile Picture ?');

                if(confirm){
                    
                    await deleteObject(ref(storage, user.profil_picPath));

                    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                       profil_pic: "",
                       profil_picPath: "",

                    });

                    navigate("/home");
                }
            }catch (err) {
                console.log(err.message)
            }

        }






    return user ?(
        <section>
{/*           
            <div>
                <NavBar/>
            </div> */}

            <div className="profile_container">

                <div className="img_container">
                    <img className="image_styles" src={user.profil_pic || Img} alt="profil_pic" />

                        <div className="overlay">
                                <div>
                                    <label htmlFor="photo" className="cam">
                                        <Camera/>
                                    </label>
                                    {user.profil_pic ? <Delete deleteImage={deleteImage}/> : null}
                                    <input 
                                    type="file" 
                                    accept='image/*' 
                                    style={{display: "none"}} 
                                    id='photo' 
                                    onChange={e=> setImg(e.target.files[0])}
                                    />
                                </div>
                        </div>
   
                </div>

                <div className="text_ container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr />
                    <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
                </div>

            </div>
        </section>

    ) : null;




}

export default Profile;