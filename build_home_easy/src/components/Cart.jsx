import React, { createContext, useEffect, useId, useState } from 'react'
import '../css/cart.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';



const Cart = () => {

    let [userEmail,setUserEmail]=useState('')
    let [itemDetails,setItemDetails]=useState('')
    let [editIndex,setEditIndex]=useState(null)
    let [editQuantity,setEditQuantity]=useState('')
    let [editToatalPrice,setToatalPrice]=useState(0)

    let navigate=useNavigate()

    useEffect( () => {
        let Email = localStorage.getItem('user');
        if (Email) {
          console.log("Email",Email)
          setUserEmail(Email)
        } 
        else 
        {
          console.log('No user data found in local storage');
        }
    }, []);

    
    useEffect(()=>{
        if(userEmail){
            fetchData()
        }
    },[userEmail])

    let fetchData= async () => {
        try{
            const response = await axios.post('http://localhost:5164/homeGetUserByEmail', {
                eventID: "1001",
                addInfo: {
                    email: userEmail  // Assuming userId is passed as prop to UserProfile
                }
            });
            console.log("response",response.data.rData.users)
            let userId=response.data.rData.users[0].id;
            try{
                 const response2 = await axios.post('http://localhost:5164/homeGetAllAddedCartById', {
                    eventID: "1001",
                    addInfo: {
                        userId: userId 
                    }
                });
                setItemDetails(response2.data.rData.users)
            } 
            catch (error)
            {
                toast.error(error.message);
            }
        } 
        catch (error)
        {
          toast.error(error.message);
        //   console.log("error",error.message);
        }
    }
    
    let handleDeleteItem = async (dataToBeDelete)=> {
        let confirm=window.confirm("Are You Sure")
        if(confirm){
          let payload={
            eventID: "1001",
            addInfo: {
              id: dataToBeDelete,
            }
          }
          const response = await axios.post('http://localhost:5164/homeDeleteCartById', payload);
          if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
            toast.error("Failed")
          }
          else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
            toast.success("Deleted Successful")
            fetchData()
          }
        }
    }

    const handleEditClick = (index, quantity, pricePerItem) => {
        setEditIndex(index);
        setEditQuantity(quantity);
        setToatalPrice(quantity*pricePerItem)
    };

    const handleInputChange = (quantity,pricePerItem) => {
        // if(quantity>0){
            setEditQuantity(quantity);
            setToatalPrice(quantity*pricePerItem)
        // }
    };

    let handleEditSave= async (saveIndex)=>{
        if(editQuantity>0){
            console.log("saveIndex",itemDetails[saveIndex])
            let payload={
                eventID: "1001",
                addInfo: {
                  id: itemDetails[saveIndex].id,
                  quantity: editQuantity,
                  totalPrice: editToatalPrice,
                }
            }
            console.log("payload",payload)
              const response = await axios.post('http://localhost:5164/homeUpdateCartById', payload);
              if(response.data.rData.rMessage==='No rows affected. Update failed.'){
                toast.error("Failed")
              }
              else if(response.data.rData.rMessage==='UPDATE SUCCESSFULLY.'){
                toast.success("Updated Successful")
                setEditIndex(null)
                fetchData()
              }
        }
        else{
            toast.warn("Quantity Min 1 Allowed")
        }
    }

  return (
      <div className='cart'>
        {

          itemDetails.length===0 ?  
          //   <div className='spinners'>
          //     <SyncLoader color="#36D7B7" itemDetails={itemDetails} size={20} />
          //   </div>
          <>
              <div className='cartNoItem'>
                  <img src='../assests/empty-cart.png' alt="cartImage" />
                  <button onClick={()=>navigate('/')}>Buy Now</button>
              </div>
          </>
            :
          <>
            <div className='tableContainer'>
                <table>
                  <thead>
                    <tr>
                      {/* <th>Id</th> */}
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price Per Item</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Date And Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {itemDetails.map((item,index) => (
                        <tr key={index}>
                            {/* <td>{item.id}</td> */}
                            <td><img src={item.itemImage} alt="image" className='profile'/></td>
                            <td>{item.itemName}</td>
                            <td>{item.pricePerItem} {item.pricePerItem2}</td>

                              {
                                editIndex === index ?
                                  <>
                                      <td>
                                          <input type="number" name="" id="" className='editQuantity'
                                              value={editQuantity} 
                                              onChange={(e) => handleInputChange(e.target.value, item.pricePerItem)} 
                                          />
                                      </td>
                                      <td>
                                          {editToatalPrice}
                                      </td>
                                  </>
                                  :
                                  <>
                                      <td>{item.quantity}</td>
                                      <td>{item.totalPrice}.00</td>
                                  </>
                              }

                            <td>{item.dateAndTime}</td>
                            <td>
                              <div className='action'>
                            
                                {editIndex === index ?
                                      <>
                                          <button onClick={() => handleEditSave(index)} className='edit-btn '>Save</button>
                                          <button onClick={() => setEditIndex(null) } className='delete-btn '>Cancel</button>
                                      </>
                                      : 
                                      <>
                                          <button onClick={() => handleEditClick(index, item.quantity,item.pricePerItem)} className='edit-btn'>Edit</button>
                                          <button 
                                              onClick={()=>handleDeleteItem(item.id)} 
                                              className='delete-btn'  
                                          >Delete
                                          </button>
                                      </>
                                  }
                              
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                  </tbody>
                
                </table>
              </div>
          </>
        }
      </div>
  )
}

export default Cart
