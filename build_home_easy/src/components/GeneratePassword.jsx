import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/generatePassword.css"
import { toast } from 'react-toastify';

const GeneratePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 
  

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
        return;
      }
      const updatePayload = {
        eventID: "1001",
        addInfo: {
          email: email,
          password: newPassword
        }
      };  
    //   console.log('Update Payload:', updatePayload);
      const response = await axios.post('http://localhost:5164/homeForgetPasswordUpdatepassword', updatePayload);
      const data = response.data.rData.message;
    //   console.log('Update Response:', data);
        if (data==='Password updated successfully') {
            toast.success('Password Updated Successfully');
            navigate('/login'); 
        } 
        else if(data==='Failed to update password') {
            toast.error('Updated Faild'); 
        }
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };
  

  return (
    <div className="generatePassword">
      {/* <div className="left-section">
        <div className="logo">NEW PASSWORD</div>
        <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
      </div> */}
      <div className="right-section">
        <div className="login-container">
          <h2>Enter New Password</h2>
          <form className="login-form" onSubmit={handlePasswordUpdate}>
            <label>
              Enter Email*
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              New Password*
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password*
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="login-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneratePassword;
