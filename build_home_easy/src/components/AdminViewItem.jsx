import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/adminViewItem.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminViewItem = () => {

    let {item}=useLocation().state
    let [itemDetails,setItemDetails]=useState([])

    let navigate=useNavigate()

    useEffect(()=>{
        console.log("itemDetails updated",itemDetails)
        // console.log("view item",item.name)
    },[itemDetails])

    useEffect(() => {
        fetchProducts(); 
    }, []);
    
      let fetchProducts = async () => {
        try {
          const response = await axios.post('http://localhost:5164/homeGetAllChildItemsById', {
            eventID: "1001",
            addInfo: {
                itemId:item.id
            }
          });
    
          if (response.data.rData.rMessage === 'Successful') {
            setItemDetails(response.data.rData.users);
            console.log("Fetched productDetails successfully");
            console.log("itemDetails ",itemDetails);
    
          } else {
            console.log("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      let handleDeleteItem = async (dataToBeDelete)=> {

        let confirm=window.confirm("Are You Sure")
    
        if(confirm){
    
          let payload={
            eventID: "1001",
            addInfo: {
              id: dataToBeDelete,
            }
          }
          const response = await axios.post('http://localhost:5164/homeDeleteChildItem', payload);
          console.log(response)
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
    <div className='adminViewItem'>
        <div className='parentDetails'>
            <img src={item.image} alt="" />
            <h2>{item.name}</h2>
        </div>
        <div className='tableContainer'>
            <table>
                <thead>
                <tr>
                    {/* <th>Id</th> */}
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Per Item</th>
                    <th>Min Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {itemDetails.map((item2,index) => (
                    <tr key={index}>
                        {/* <td>{item.id}</td> */}
                        <td><img src={item2.image} alt="image" className='profile'/></td>
                        <td>{item2.name}</td>
                        <td>{item2.price}</td>
                        <td>{item2.perItem || '--'}</td>
                        <td>{item2.minQuantity || '--'}</td>
                        <td>
                            <div className='action'>
                               
                                <button 
                                    // onClick={()=>handleEdit(item)} 
                                    className='edit-btn' onClick={()=>navigate('/admin/editChildItem',{state:{item2,item}})}>Edit</button>
                                <button 
                                    onClick={()=>handleDeleteItem(item2.id)} 
                                    className='delete-btn'  >Delete</button>
                            </div>
                        </td>
                        </tr>
                    ))
                    }
                </tbody>
            
            </table>
        </div>
        <div className='addProduct' >
            <button onClick={()=>navigate("/admin/allItems")} className='back' >Back</button>
            <button onClick={()=>navigate("/admin/addChildItem",{state:{item}})} className='add'>Add New Item</button>
        </div>

    </div>
  )
}

export default AdminViewItem
