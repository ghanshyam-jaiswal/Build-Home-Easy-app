import React, { useDebugValue, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/payment.css'
import axios from 'axios';


const Payment = () => {

    let navigate=useNavigate()

    const location = useLocation();
    const { item, childItem, totalPrice, quantity } = location.state;

    let [userDetails,setUserDetails]=useState('')

    // console.log("item",item)
    console.log("childItem",childItem)
    console.log("totalPrice ",totalPrice) 
    console.log("quantity ",quantity)

    useEffect( () => {
      let userEmail = localStorage.getItem('user');
      if (userEmail) {
        // console.log("userEmail",userEmail)
        async function fetchData(){
          try{
            const response2 = await axios.post('http://localhost:5164/homeGetUserByEmail', {
                    eventID: "1001",
                    addInfo: {
                      email: userEmail  // Assuming userId is passed as prop to UserProfile
                    }
                  });
            // localStorage.setItem('user',response2.data.rData.users[0].email);
            setUserDetails(response2.data.rData.users)
            // console.log("userDetails",userDetails)
            // toast.success('Login Successful');
            // let user=localStorage.getItem("user")
            // navigate('/');
          } 
          catch (error)
          {
            toast.error(error.message);
          }
        }
        fetchData()
   
        } 
      else 
      {
        console.log('No user data found in local storage');
      }
    }, []);

    useEffect(()=>{
      console.log("userDetails2",userDetails)
    },[userDetails])

    
    let handleUpload= async (e)=>{
      let payload={
        eventID: "1001",
        addInfo: {
          userId: userDetails[0].id,
          itemImage: childItem.image,
          itemName: childItem.name,
          pricePerItem: childItem.price,
          pricePerItem2: childItem.perItem,
          quantity: quantity,
          totalPrice:totalPrice,
          userName:userDetails[0].first_name + " " + userDetails[0].last_name ,
          userContact:userDetails[0].contact,
          userAddress:userDetails[0].street_address1 + ", " + userDetails[0].street_address2
        }
      }
      // console.log("payload",payload)
      const response = await axios.post('http://localhost:5164/homeAddToCart', payload);
        console.log("addToCart response",response)
        if(response.data.rData.rMessage==='Invalid price'){
            toast.error("Invalid Product Price")
        }
        if(response.data.rData.rMessage==='Duplicate Credentials'){
            toast.error("Already Exists")
        }
        else if(response.data.rData.rMessage==='Added Successful'){
          toast.success("Successful")
          navigate('/')
      }
    }

  return (
    <div className='payment'>
      <div className="payment-body">
        {/* <h1>Quantity : {quantity}</h1> */}
        <h1>Payment : {totalPrice}</h1>
        {/* <button className='btn-proceed' onClick={()=>{addToCart(selectedCard);thankYou()}}>Proceed</button> */}
        <button className='btn-proceed' onClick={()=>{handleUpload()}}>Proceed</button>
        <button className='btn-cancel' 
          onClick={()=>{
            navigate(`/item/${item.name}`,{state:{item}})
            // console.log("itemName",item.name)
          }
          }
        >Cancel</button>
      </div>
    </div>
  )
}

export default Payment
