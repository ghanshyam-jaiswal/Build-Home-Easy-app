import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/otpVerify.css'
import { toast } from 'react-toastify';

const OTPverify = () => {
  const [otp, setOtp] = useState('');

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 
  
    const navigate = useNavigate();
  // const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID:"1001",
      addInfo:{
        otp:otp
      }
   };
    try {
      const response = await axios.post('http://localhost:5164/homeForgetPasswordVerifyOTP',payload);
      const res = response.data.rData.message;
      // console.log("response",res)
      if(res === 'OTP verified successfully'){
          toast.success('OTP Verified SuccessFully')
         navigate('/generatePassword');
      }
      else if(res==='Invalid OTP'){
        toast.error("Invalid OTP")
      }
    } catch (error){ 
      // console.error('Error verification OTP:',error);
      toast.error('Error invalid OTP Please try again..',error)
    }
  }
  return (
    <div className="otpVerify">
      {/* <div className="left-section">
        <div className="logo">OTP VERIFICATION</div>
        <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
      </div> */}
      <div className="right-section">
        <div className="login-container">
          <h2>Enter OTP Number</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              OTP*
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </label>
            <button type="submit" className="login-button">Submit</button>
            <Link to="/verifyEmail">
              <button type="button" className="button2">Generate</button>
            </Link>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default OTPverify;