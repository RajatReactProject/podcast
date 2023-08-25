import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/common/Header';
import Buttons from '../Components/common/Buttons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function Profile() {
    const user = useSelector((state) => state.user.user);
    console.log("My User : ",user);
    if(!user){
        return <p>Loading...</p>
    }
    const handleLogout = () => {
        signOut(auth).then(()=>{
            toast.success("Logged Out");
            Navigate("/");
        }).catch((error) =>{
            //toast.error(error.message);

        });

    };
  return (
    <div>
        <Header />
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Buttons style = {{cursor:'pointer'}} onClick={handleLogout} text={"Logout"}/>
    </div>
  )
}

export default Profile