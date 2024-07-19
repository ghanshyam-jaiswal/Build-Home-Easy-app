import React, { useState } from "react";
import "../css/contact.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FaMailBulk } from "react-icons/fa";
// import Landing from "./Landing";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();
import { FaUserLarge } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdFax } from "react-icons/md";
import axios from 'axios';



const Contact = () => {

  let navigate=useNavigate()

  let [userDetails,setUserDetails]=useState({
    name:'',
    email:'',
    message:'',
  })

  let isValidate=()=>{
    let proceed=true
    let message='Enter';
    if(userDetails.name===''|| userDetails.name===null){
      proceed=false
      message+=' Name'
    }
    else if(userDetails.email===''|| userDetails.email===null){
      proceed=false
      message+=' Email'
    }
    else if(userDetails.message===''|| userDetails.message===null){
      proceed=false
      message+=' Message'
    }
    if(!proceed){
      // alert(message)
      toast.info(message)
    }
    return proceed
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload={
        eventID: "1001",
        addInfo: {
          name:userDetails.name ,
          email: userDetails.email,
          message: userDetails.message,
        }
    }
    console.log(userDetails)
    if (!isValidate()) return;
    try {
      const response = await axios.post('http://localhost:5164/homeContact', payload);
      console.log(response)
      if(response.data.rData.rMessage==='Duplicate Credentials'){
        toast.error("Already Submitted")
      }
      else if(response.data.rData.rMessage==='Successful'){
        console.log('Submission Successful');
        toast.success('Submission Successful');
        console.log(response.data);
        // navigate('/thankyou');
        setUserDetails({
          name: '',
          email: '',
          message: ''
        });
      }
    } 
    catch (error) {
      console.error('Error signing up:', error);
      toast.error('An error occurred during signup',error);
    }
  };

  return (
    <>
      <div className="contact">
        
        <div className="contact-details">
          <div className="contact-details-1">
            <div className="contact-details-1-details">
                <div className="icon-text"> <label htmlFor="name"><FaUserLarge className="icon"/></label> <input type="text" id="name" placeholder="Name" value={userDetails.name} onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})}/> </div>
                <div className="icon-text"> <label htmlFor="email"><MdEmail className="icon"/></label><input type="email" id="email" placeholder="Email" value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/> </div>
                <textarea name="" id="" placeholder="Write Here......" value={userDetails.message} onChange={(e)=>setUserDetails({...userDetails,message:e.target.value})}></textarea>
                <div className="contact-details-1-details-button" ><button onClick={handleSubmit}>Send Message</button></div>
            </div>
          </div>

          <div className="contact-details-2">
            {/* <h1>Contact Us</h1> */}
            <img src="../assests/contact_removebg.png" alt="Contact Us" />
          </div>

          <div className="contact-option">
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><FaLocationDot /></div>
                <div className="contact-option-box-h"><h3>OFFICE</h3></div>
                <div className="contact-option-box-p"><p>Plot No. 16, Electronic City, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122001</p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><IoCall /></div>
                <div className="contact-option-box-h"><h3>PHONE NUMBER</h3></div>
                <div className="contact-option-box-p"><p><a href="tel:7000365544">+91-7000365544</a></p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><MdFax /></div>
                <div className="contact-option-box-h"><h3>FAX</h3></div>
                <div className="contact-option-box-p"><p><a href="tel:1-234-567-8900">1-234-567-8900</a></p></div>
              </div>
              <div className="contact-option-box">
                <div className="contact-option-box-icon"><MdEmail/></div>
                <div className="contact-option-box-h"><h3>EMAIL</h3></div>
                <div className="contact-option-box-p"><p><a href="mailto:">ghanshyamjaiswal7000@gmail.com</a></p></div>
              </div>
              
            </div>
        </div>

      </div>
    </>
  );
};

export default Contact;
