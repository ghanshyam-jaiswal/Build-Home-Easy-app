import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import "../css/adminOrders.css"
import { toast } from 'react-toastify';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";


const AdminOrders = () => {

  let navigate=useNavigate()

  let [productDetails,setProductDetails]=useState([])

  useEffect(() => {
    fetchProducts(); 
  }, []); 

  useEffect(()=>{
    console.log("All Cart updated",productDetails)
  },[productDetails])

  let fetchProducts = async () => {
    try {
      const response = await axios.post('http://localhost:5164/homeGetAllCarts', {
        eventID: "1001",
        addInfo: {}
      });

      if (response.data.rData.rMessage === 'Successful') {
        setProductDetails(response.data.rData.users);
        // console.log("Fetched All Carts successfully");
        // console.log("All Carts ",productDetails);

      } else {
        console.log("Failed to fetch All Carts");
      }
    } catch (error) {
      console.error("Error fetching All Carts:", error);
    }

  };

  let handleCartDelete = async (dataToBeDelete)=> {
    let confirm=window.confirm("Are You Sure")
    if(confirm){

      let payload={
        eventID: "1001",
        addInfo: {
          id: dataToBeDelete,
        }
      }
      // console.log("payload",payload)
      const response = await axios.post('http://localhost:5164/homeDeleteCartById', payload);
      if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
        toast.error("Failed")
      }
      else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
        toast.success("Deleted Successful")
        fetchProducts();
      }
    }
  }

  return (
    <div className='adminOrders'>
       <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Per Item</th>
                <th>Quantity</th>
                <th>Total Price</th>
                {/* <th>Other Problem</th> */}
                <th>User Name</th>
                <th>Contact</th>
                <th>Address</th>
                {/* <th>Uploaded Images</th> */}
                <th>Date-Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {productDetails.map((product,index) => (
                  <tr key={index}>
                      <td><img src={product.itemImage} alt="image" className='profile'/></td>
                      <td>{product.itemName}</td>
                      <td>Rs. {product.pricePerItem}</td>
                      <td>{product.pricePerItem2 || '--'}</td>
                      <td>{product.quantity || '--'}</td>
                      <td > <RiMoneyRupeeCircleFill color='green' fontSize={'1.1vw'} />  {product.totalPrice || '--'}.00</td>
                      <td>{product.userName || '--' }</td>
                      <td><a href={ product.userContact ? `tel:${product.userContact}` : ''} style={{textDecoration:'none', pointerEvents: product.userContact ? 'auto' : 'none'}}>{product.userContact || '--' }</a></td>
                      <td>{product.userAddress || '--'}</td>
                      <td>{product.dateAndTime || '--'}</td>
                      <td>
                        <div className='action'>
                          {/* <button onClick={()=>navigate(`/admin/updateproduct/${product.id}`)} className='delete-btn update'>Update <BiEdit style={{fontSize:'1vw'}} /></button> */}
                          <button className='delete-btn' onClick={()=>handleCartDelete(productDetails[index].id)}>Delete <MdDeleteForever style={{fontSize:'1.1vw'}}/></button>
                        </div>
                      </td>
                    </tr>
                ))
                }
             </tbody>
          
          </table>
        </div>

        {/* <div className='addProduct' >
          <button onClick={()=>navigate('/admin/addproduct')}>Add New Product</button> 
           <Link to={'/admin/addproduct'}>Add New Product</Link>
        </div> */}

    </div>
  )
}

export default AdminOrders
