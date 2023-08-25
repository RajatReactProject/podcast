import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Buttons from '../../common/Buttons';
import {auth, db, store} from "../../../firebase";
import {signOut,signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';





function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        console.log("Login");
        try{
            const userCredntial = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredntial.user;
            
            
            //login
            const userDoc = await getDoc(doc(db,"users",user.uid),{
                email : email,
                uid:user.uid,
            });
            const userData = userDoc.data();
            console.log("user Data: ", userData);

            dispatch(setUser({
                name:userData.name,
                email : email,
                uid:user.uid,
                
            }));
            toast.success("Logged In");
            navigate("/profile");

          }
          catch(e){
            setLoading(false);
            console.log("Error: ", e);
            toast.error("Login Failed");
            toast.error("Error:",e.message);
          }
    }
    return (
        <div className='input-wrapper'>
            <InputComponent state={email} setState={setEmail} placeholder="Email" required={true} type="text" />
            <InputComponent state={password} setState={setPassword} placeholder="Password" required={true} type="password" />
            <Buttons text={loading?"Loading...":"Login"}  onClick={handleLogin} />
            
            </div>
    )
}

export default SignupForm;