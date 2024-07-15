import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Nav from './components/Nav'
import Test from './components/Test'
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

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/test1' element={<Test/>}></Route>
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
        </Routes>
      </BrowserRouter>
      <ToastContainer/>

    </div>
  )
}

export default App
