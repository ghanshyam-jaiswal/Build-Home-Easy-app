import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Nav from './components/Nav'
import Test from './components/Test'
import Signup from './components/Signup'
import Admin from './components/Admin'
import AdminAllItems from './components/AdminAllItems'
import AdminUpdateItem from './components/AdminUpdateItem'
import AdminAddItem from './components/AdminAddItem'
import AdminAddChildItem from './components/AdminAddChildItem'
import AdminUsers from './components/AdminUsers'
import AdminOrders from './components/AdminOrders'
import AdminContact from './components/AdminContact'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminEditItem from './components/AdminEditItem'
import AdminViewItem from './components/AdminViewItem'
import AdminEditChildItem from './components/AdminEditChildItem'
import axios  from "axios";
import Login from './components/Login'
import Contact from './components/Contact'
import Item from './components/Item'
import Payment from './components/Payment'
import Cart from './components/Cart'
import UserProfile from './components/UserProfile'
import UserProfileEdit from './components/UserProfileEdit'

const App = () => {

  let [list,setList]=useState([])
  let [userEmail,setUserEmail]=useState('')
  let [addedCart,setAddedCart]=useState('')
  let [userDetails,setUserDetails]=useState('')


  useEffect(()=>{
    let email=localStorage.getItem("user")
    if(email){
      setUserEmail(email)
      // console.log("App userEmail",userEmail)
    }
  },[])

  useEffect(()=>{
    if(userEmail){
        fetchAddedCart()
        // console.log("App userEmail2",userEmail)
        // console.log("app cart",addedCart)
    }
  },[userEmail])

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    // console.log("Product List updated",list)
  },[list])

  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/homeGetAllItems', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setList(response.data.rData.users);
        // console.log("Fetched product List successfully");
        // console.log("product List ",list);

      } else {
        console.log("Failed to fetch  Product List");
      }
    } catch (error) {
      console.error("Error fetching Product List:", error);
    }
  };

  let fetchAddedCart= async () => {
    try{
        const response = await axios.post('http://localhost:5164/homeGetUserByEmail', {
            eventID: "1001",
            addInfo: {
                email: userEmail  
            }
        });
        // if(response.data.rData.rMessage==="Successful"){
        //   console.log("app response",response.data.rData.users[0].id);
        // }

        console.log("app response",response.data.rData.users)
        setUserDetails(response.data.rData.users[0])
        let userId=response.data.rData.users[0].id;
        try{
             const response2 = await axios.post('http://localhost:5164/homeGetAllAddedCartById', {
                eventID: "1001",
                addInfo: {
                    userId: userId 
                    // userId: response.data.rData.users[0].id 
                }
            });
            setAddedCart(response2.data.rData.users)
            console.log("app cart",addedCart)
        } 
        catch (error)
        {
            // toast.error(error.message);
            console.log("app.jsx error",error.message);
        }
    } 
    catch (error)
    {
      // toast.error(error.message);
      console.log("app.jsx error",error.message);
    }
  }



  return (
      <div>
          <BrowserRouter>
              <Nav list={list} addedCart={addedCart} userDetails={userDetails} />
              <Routes>
                <Route path='/' element={<Landing list={list}/>}></Route>
                <Route path='/test1' element={<Test/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/contact' element={<Contact/>}></Route>
                <Route path='/item/:name' element={<Item/>}></Route>
                <Route path='/payment' element={<Payment/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/profile' element={<UserProfile userDetails={userDetails} />}></Route>
                <Route path='/profileEdit' element={<UserProfileEdit />}></Route>

                {/* <Route path="/admin" element={<Admin/>} > */}
                    {/* <Route index element={<Navigate to="/admin/users" />} /> */}
                    {/* <Route path="/admin/products" element={<AdminProduct/>} ></Route> */}
                    <Route path="/admin/allItems" element={<AdminAllItems/>} ></Route>
                    <Route path="/admin/editItem" element={<AdminEditItem/>} ></Route>
                    <Route path="/admin/updateItem/:id" element={<AdminUpdateItem/>} ></Route>
                    <Route path="/admin/addItem" element={<AdminAddItem/>} ></Route>
                    <Route path="/admin/viewItem" element={<AdminViewItem/>} ></Route>
                    <Route path="/admin/addChildItem" element={<AdminAddChildItem/>} ></Route>
                    <Route path="/admin/editChildItem" element={<AdminEditChildItem/>} ></Route>
                    <Route path="/admin/users" element={<AdminUsers/>} ></Route>
                    <Route path="/admin/orders" element={<AdminOrders/>} ></Route>
                    <Route path="/admin/contact" element={<AdminContact/>} ></Route>
                {/* </Route> */}
                  {/* <Route path='/footer' element={<Footer/>}></Route> */}
              </Routes>
              {/* <Footer/> */}
          </BrowserRouter>
          <ToastContainer/>
      </div>

  )
}

export default App
