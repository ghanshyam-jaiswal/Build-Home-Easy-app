import React, { useEffect } from 'react'
import '../css/signup.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

const Signup = () => {

  let [userGender,setUserGender]=useState('')
  let [visible,setVisible]=useState(false)
  let navigate=useNavigate()

  let [userDetails,setUserDetails]=useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    contact:'',
    streetAddress1:'',
    streetAddress2:'',
    city:'',
    state:'',
    pincode:'',
    country:'',
    profile:''
  })

  let isValidate=()=>{
    let proceed=true
    let message='Enter';
    if(userDetails.firstName===''|| userDetails.firstName===null){
      proceed=false
      message+=' Name'
    }
    else if(userDetails.email===''|| userDetails.email===null){
      proceed=false
      message+=' Email'
    }
    else if(userDetails.password===''|| userDetails.password===null){
      proceed=false
      message+=' Password'
    }
    if(!proceed){
      toast.info(message)
    }
    return proceed
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload={
        eventID: "1001",
        addInfo: {
          first_name:userDetails.firstName ,
          last_name: userDetails.lastName,
          gender:userGender,
          email: userDetails.email,
          password: userDetails.password,
          contact: userDetails.contact,
          street_address1:userDetails.streetAddress1 ,
          street_address2: userDetails.streetAddress2,
          city: userDetails.city,
          state: userDetails.state,
          pincode: userDetails.pincode,
          country: userDetails.country,
          profile:userDetails.profile
        }
    }
    if (!isValidate()) return;
    try {
      const response = await axios.post('http://localhost:5164/homeSignup', payload);
      if(response.data.rData.rMessage==='Duplicate Credentials'){
        toast.error("Already Exists")
      }
      else if(response.data.rData.rMessage==='Signup Successful'){
        toast.success('Signup successful');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Error signing up:', error)
    }
  };

  return (
    <div className='signup'>
        <form onSubmit={(e) => e.preventDefault()}>

          <h1>Sign Up</h1>

          <div className='signup-div'>
            <div className="signup-fullname">
              <label htmlFor="name" >Full Name</label><br/><br/>
              <input type="text" id="name" placeholder='First Name' value={userDetails.firstName} onChange={e=>setUserDetails({...userDetails,firstName:e.target.value})}/>
              <input type="text" placeholder='Last Name' value={userDetails.lastName} onChange={e=>setUserDetails({...userDetails,lastName:e.target.value})} />
            </div>

            <div className='gender'>
              <select 
                  value={userGender}
                  onChange={(e)=>setUserGender(e.target.value)}
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          
            <div className="signup-email">
              <label htmlFor="email">Email</label><br/><br/>
              <input type="email" id="email" placeholder='eg: shyam@gmail.com' value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} />
            </div>

            <div className="signup-email">
              <label htmlFor="pass">Password {visible ? <ImEyeBlocked onClick={() => setVisible(!visible)} className='icon'/> : <ImEye onClick={() => setVisible(!visible)} className='icon' />}</label><br/><br/>
              <input type={visible ? 'text' : 'password'} id="pass" placeholder='Enter Password' value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} />
            </div>

            <div className="signup-contact">
              <label htmlFor="contact">Contact</label><br/><br/>
              <input type="text" id="contact" placeholder='Enter Number' maxLength="10" minLength="10"  pattern="\d{10}"  inputMode="numeric" value={userDetails.contact} onChange={e=>setUserDetails({...userDetails,contact:e.target.value})} />
            </div>

            <div className="signup-address">
              <label htmlFor="address">Address</label><br/><br/>
              <input type="text" id="address" placeholder='Street Address 1' value={userDetails.streetAddress1} onChange={e=>setUserDetails({...userDetails,streetAddress1:e.target.value})} />
              <input type="text" placeholder='Street Address 2' value={userDetails.streetAddress2} onChange={e=>setUserDetails({...userDetails,streetAddress2:e.target.value})} />
              <input type="text" placeholder='City' value={userDetails.city} onChange={e=>setUserDetails({...userDetails,city:e.target.value})}/>
              <input type="text" placeholder='state' value={userDetails.state} onChange={e=>setUserDetails({...userDetails,state:e.target.value})}/>
              <input type="number" placeholder='Postal / Zip Code' value={userDetails.pincode} onChange={e=>setUserDetails({...userDetails,pincode:e.target.value})}/>
              <input type="text" placeholder='Country' value={userDetails.country} onChange={e=>setUserDetails({...userDetails,country:e.target.value})} />
            </div>

            <div className="signup-submit">
              {/* <input type="submit" value={'Sign up'} style={{backgroundColor:'rgb(81, 81, 222)',color:'white'}}/> */}
              <button onClick={handleSubmit}>Sign up</button>
            </div>
          </div>
        </form>
        
    </div>
  )
}

export default Signup
