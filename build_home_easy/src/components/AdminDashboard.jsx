import React, { useEffect, useState } from 'react'
import '../css/adminDashboard.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { LiaSitemapSolid } from "react-icons/lia";
import { FaCartPlus } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";

const AdminDashboard = () => {

  const [greeting, setGreeting] = useState('');
  const [message, setMessage] = useState('');

  let [countContact,setCountContact]=useState('')
  let [countItems,setCountItems]=useState('')
  let [countUsers,setCountUsers]=useState('')
  let [countAddToCart,setCountAddToCart]=useState('')
  let [countTotalIncome,setCountTotalIncome]=useState('')

  let navigate=useNavigate()

  useEffect(() => {
    const getGreetingAndMessage = () => {
        const currentHour = new Date().getHours();
        let greeting;
        let message;

        if (currentHour < 12) {
            greeting = 'Good Morning';
            message = 'Have a nice day at work';
        } else if (currentHour < 18) {
            greeting = 'Good Afternoon';
            message = 'Hope your day is going well';
        } else {
            greeting = 'Good Evening';
            message = 'Enjoy your evening';
        }
        return { greeting, message };
    };
    const { greeting, message } = getGreetingAndMessage();
    setGreeting(greeting);
    setMessage(message);
  }, []);


  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(()=>{
    // console.log("countContact updated",countItems)
  },[countContact,countItems,countUsers,countAddToCart,countTotalIncome])

  let fetchCount = async () => {

    try {
      const response = await axios.post('http://localhost:5164/homeCountContact', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
          setCountContact(response.data.rData.users[0].id);
      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }

    try {
      const response = await axios.post('http://localhost:5164/homeCountItems', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setCountItems(response.data.rData.users[0].id);
      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }

    try {
      const response = await axios.post('http://localhost:5164/homeCountUsers', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setCountUsers(response.data.rData.users[0].id);
      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }

    try {
      const response = await axios.post('http://localhost:5164/homeCountAddToCart', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setCountAddToCart(response.data.rData.users[0].id);
      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }

    try {
      const response = await axios.post('http://localhost:5164/homeCountTotalIncome', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setCountTotalIncome(response.data.rData.users[0].totalPrice);
      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }


  };


  return (
    <div className='adminDashboard'>
      <h1 className='title'>Dashboard</h1>
      <div className="section1">
        <div className='greet'>
            <h1 style={{fontSize:'1.6vw'}} >{greeting}, Admin</h1>
            <p style={{fontSize:'1vw'}} >{message}</p>
        </div>
        <div className='greet2'>
            <img src="../assests/admin-king-logo.png" alt="" />
            <h1 style={{fontSize:'1.6vw'}} >Admin</h1>
        </div>
      </div>
      <div className="section2">
        <div>
            <FaUsers fontSize={'2.5vw'} />
            <h1 style={{fontSize:'1.6vw'}}>Users</h1>
            <p>{countUsers}</p>
            <button onClick={()=>{navigate('/admin/users')}}>View</button>
        </div>
        <div>
            <LiaSitemapSolid fontSize={'2.5vw'} />
            <h1 style={{fontSize:'1.6vw'}}>Items</h1>
            <p>{countItems}</p>
            <button onClick={()=>navigate('/admin/allItems')}>View</button>
        </div>
        <div>
            <FaCartPlus fontSize={'2.2vw'} />
            <h1 style={{fontSize:'1.6vw'}}>Orders</h1>
            <p>{countAddToCart}</p>
            <button onClick={()=>navigate('/admin/orders')}>View</button>
        </div>
        <div>
            <GrContact fontSize={'2.1vw'} />
            <h1 style={{fontSize:'1.6vw'}}>Contact</h1>
            <p>{countContact}</p>
            <button onClick={()=>navigate('/admin/contact')}>View</button>
        </div>
        <div>
            <GiTakeMyMoney fontSize={'2.9vw'} color='green'/>
            <h1 style={{fontSize:'1.6vw'}}>Total Income</h1>
            <p className='income'>{countTotalIncome}</p>
            {/* <button>View</button> */}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
