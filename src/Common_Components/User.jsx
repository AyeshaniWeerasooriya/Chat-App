import React, {useEffect, useState} from "react";
import Img from '../Images/image_one.jpg';
import './User.css'
import {onSnapshot, doc} from 'firebase/firestore'
import {db} from "../firebase"


function User({user1,user, selectUser, chat}){

        const user2= user?.uid

        const [data, setData]= useState('')



        useEffect(() => {

            const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
                let unsub= onSnapshot(doc(db, 'lastMsg', id), (doc) =>{
                    setData(doc.data());
                });
                return () => unsub()
        }, []);
       



    return(

        <>
        <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`} onClick={() => selectUser(user)}>

            <div className="user_info">
                <div className="user_detail">
                    <img className="profil_pic" src={user.profil_pic || Img} alt="profil_pic"  />
                    <h4>{user.name}</h4>
                    {data?.from !== user1 && data?.unread && (
                    <small className="unread">New</small>
                    )}
                </div>
                <div className={`user_status ${user.isOnline ? "online" : "offline"}`}>

                </div>
            </div>

            { data && (
                
                <p className="truncate">
                    <strong>{data.from === user1 ? "me:" : "friend:"}</strong>
                    {data.text}
                    </p>
         )} 

            
                

        </div>
        <div
        
        onClick={() => selectUser(user)} className={`sm_container ${chat.name === user.name && "selected_user"}`}
        >
        <img className="profil_pic sm_screen" src={user.profil_pic || Img} alt="profil_pic"  />
        </div>
        </>

    );
}

export default User;