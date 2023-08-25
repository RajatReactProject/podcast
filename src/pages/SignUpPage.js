import React, { useState } from 'react';
import Header from '../Components/common/Header';
import SignupForm from '../Components/SignupComponent/SignupForm';
import LoginForm from '../Components/SignupComponent/LoginForm';

function SignUpPage() {
  const [flag, setFlag] = useState(false);
  
  
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ?<h1>Signup</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm />}
        {!flag ?<p style = {{cursor:'pointer'}} onClick={()=>setFlag(!false)}>Already have an account? Click here to login</p> 
        : 
        <p style = {{cursor:'pointer'}} onClick={()=>setFlag(false)}>Don't have an account? Click here to signup</p>}
      </div>
    </div>
  )
}

export default SignUpPage;