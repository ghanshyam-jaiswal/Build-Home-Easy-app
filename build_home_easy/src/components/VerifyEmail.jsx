import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import "../css/verifyEmail.css"
import { toast } from 'react-toastify';

const VerifyEmail = () => {
 
    const [email, setEmail] = useState('');
      //for the restriction - we cant go to another page using back button of the website
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
          window.history.go(1);
      }; 
    
    const navigate = useNavigate();
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   console.log('Email submitted:', email);
        const payload = {
        eventID:"1001",
        addInfo:{
            email:email
        }
        };
        // console.log("payload",payload)
        try {
        const response = await axios.post('http://localhost:5164/homeForgetPasswordGenerate', payload);
        const res = response.data.rData.rMessage1;
        // console.log("res",res)
        if (res === 'Successful') {
            // alert(res);
            toast.success("OTP sent to email valid upto 5mins")
            navigate('/otpVerify');
        } 
        else if(response.data.rData.rMessage==='Email not found in our records'){
            toast.error('Email not found')
        }
        else {
            // alert(res || 'Failed to send OTP');
            toast.error(res)
        }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again.');
        }
    }


    return (
      <div className="verifyEmail">
        {/* <div className="left-section">
          <div className="logo">EMAIL VERIFICATION</div>
          <img src="/assests/email-verify.png" alt="login" className="loginimage" />
        </div> */}
        <div className="right-section">
          <div className="login-container">
            <h2>Enter Your Email ID</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <label>
                Email Address*
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </label>
              <button type="submit" className="button">Verify</button>
            </form>
          </div>
       </div>
       </div>
  
    )
  }
  
  export default VerifyEmail
  