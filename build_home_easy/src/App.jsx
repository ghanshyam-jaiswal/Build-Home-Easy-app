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
import Footer from './components/Footer'
import axios  from "axios";

const App = () => {

  let [list,setList]=useState([])

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    console.log("Product List updated",list)
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

  return (
    <div>

      <BrowserRouter>
        <Nav list={list}/>
        <Routes>
          <Route path='/' element={<Landing list={list}/>}></Route>
          <Route path='/test1' element={<Test/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>

          <Route path="/admin" element={<Admin/>} >
              <Route index element={<Navigate to="/admin/users" />} />
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
          </Route>
            {/* <Route path='/footer' element={<Footer/>}></Route> */}
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
      <ToastContainer/>

    </div>
  )
}

export default App
