import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Buttons from '../../common/Buttons';
import {auth, db, store} from "../../../firebase";
import {createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




function SignupForm() {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const handleSignup = async () => {
        console.log("Signup...");
        setLoading(true);
        if(password ===confirmPassword && password.length>6){
            try{
                const userCredntial = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
                const user = userCredntial.user;
                console.log(user);

                //save user details to firestore
                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email : email,
                    uid:user.uid,
                    //profilePic:fileURL,
                });

                //save data in redux
                dispatch(setUser({
                    name:fullName,
                    email : email,
                    uid:user.uid,
                }));
                setLoading(false);
                toast.success("Account created successfully");
                navigate("/profile");
              }
              catch(e){
                setLoading(false);
                console.log("Error: ", e);
                toast.error(e.messaage);
              }
        }
        else{
            if(password != confirmPassword){
                toast.error("Password & Confirm password are not correct");
            }
            if(password.length<6){
                toast.error("Password should be more than 6 digits");
            }
        }
        
    }
    return (
        <div className='input-wrapper'>
            <InputComponent state={fullName} setState={setFullName} placeholder="Full Name" required={true} type="text" />
            <InputComponent state={email} setState={setEmail} placeholder="Email" required={true} type="text" />
            <InputComponent state={password} setState={setPassword} placeholder="Password" required={true} type="password" />
            <InputComponent state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" required={true} type="password" />
            <Buttons text={loading ? "Loading...":"Signup"} disabled = {loading} onClick={handleSignup} />
            
            </div>
    )
}

export default SignupForm;