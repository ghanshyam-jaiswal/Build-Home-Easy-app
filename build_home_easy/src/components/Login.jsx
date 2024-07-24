import React, { useEffect } from 'react'
import "../css/login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";



const Login = () => {

  let navigate=useNavigate()

  // useEffect(()=>{
  //   let check=localStorage.getItem("user")
  //   if(check==='' || check===null){
  //     navigate('/login')
  //   }
  // },[])

  let [userDetails,setUserDetails]=useState({
    email:'',
    password:'',
  })

  let [visible,setVisible]=useState(false)

  let handleCreateAccount=()=>{
    navigate('/signup')
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = {
      eventID: "1001",
      addInfo: {
        email: userDetails.email,
        password: userDetails.password,
      },
    };
    try {
      const adminResponse = await axios.post('http://localhost:5164/homeAdminLogin', payload);
      const response = await axios.post('http://localhost:5164/homeLogin', payload);

      if(adminResponse.data==='Login successful'){
        try{
          const adminResponse2 = await axios.post('http://localhost:5164/homeGetAdminByEmail', {
                  eventID: "1001",
                  addInfo: {
                    email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                  }
                });
          localStorage.setItem('admin',adminResponse2.data.rData.users[0].email);
          toast.success('Login Successful');
          // navigate('/admin');
          navigate('/adminDashboard');
        } 
        catch (error)
        {
          toast.error(error.message);
        }
      }
      else if (response.data==='Login successful') {
        try{
            const response2 = await axios.post('http://localhost:5164/homeGetUserByEmail', {
                    eventID: "1001",
                    addInfo: {
                      email: userDetails.email  // Assuming userId is passed as prop to UserProfile
                    }
                  });
            localStorage.setItem('user',response2.data.rData.users[0].email);
            toast.success('Login Successful');
            // let user=localStorage.getItem("user")
            navigate('/');
        } 
        catch (error)
        {
          toast.error(error.message);
        }
      } 
      else
      {
        toast.error('Invalid');
      }
    }
    catch (error)
    {
      toast.error('An error occurred during login',error);
    }
  };



  return (
    <section className='login-parent'>
      <div className='login'>
        <h1>Login </h1>
        <form >
          {/* <input type='email' placeholder='Email' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} /><br/><br/> */}
          <div className="icon-text"> <label htmlFor="email"><MdEmail className="icon"/></label> <input type="email" id="email" placeholder="Email" value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/> </div>
          <div className="icon-text"> <label htmlFor="pass">{visible ? <ImEyeBlocked onClick={() => setVisible(!visible)} className='icon'/> : <ImEye onClick={() => setVisible(!visible)} className='icon' />}</label> <input type={visible?'text':'password'} id="pass" placeholder="Password" value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/> </div>

          {/* <input type='password' placeholder='Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} /><br/><br/> */}
          {/* <input type='submit' value='Login' className='submit-btn' /> */}
          <button className='submit-btn' onClick={handleLogin}>Login</button>
          <button className='submit-btn' onClick={()=>handleCreateAccount()}>Create Account</button>
          {/* <input type='submit' value='create account' className='submit-btn' /> */}
          {/* <Link t={'/signup'}>create account</Link> */}
          
        </form>
      </div>
    </section>
  )
}

export default Login
