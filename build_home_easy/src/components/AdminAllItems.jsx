import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../css/adminAllItems.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
const AdminAllItems = () => {

    let navigate =useNavigate()

    let [list,setList]=useState([])

    useEffect(() => {
      fetchProducts();
    }, []);
  
    useEffect(()=>{
      console.log("AllItem List updated",list)
    },[list])

    let fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:5164/homeGetAllItems', {
          eventID: "1001",
          addInfo: {}
        });
  
        if (response.data.rData.rMessage === 'Successful') {
          setList(response.data.rData.users);
        } else {
          console.log("Failed to fetch  Product List");
        }
      } catch (error) {
        console.error("Error fetching Product List:", error);
      }
    };

    let handleDeleteItem = async (dataToBeDelete)=> {
      console.log("dataToBeDelete id : ",dataToBeDelete)
        let confirm=window.confirm("Are You Sure")
        if(confirm){
          let payload={
            eventID: "1001",
            addInfo: {
              id: dataToBeDelete,
            }
          }
          const response = await axios.post('http://localhost:5164/homeDeleteItem', payload);
          console.log(response)
          if(response.data.rData.rMessage==='No rows affected. Delete failed.'){
            toast.error("Failed")
          }
          else if(response.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
            // toast.success("Deleted Successful")
            let payload={
              eventID: "1001",
              addInfo: {
                itemId: dataToBeDelete,
              }
            }
            const response2 = await axios.post('http://localhost:5164/homeDeleteChildItem2', payload);
            // console.log(response2)
            if(response2.data.rData.rMessage==='No rows affected. Delete failed.'){
              toast.error("Failed")
            }
            else if(response2.data.rData.rMessage==='DELETE SUCCESSFULLY.'){
              toast.success("Deleted Successful")
              fetchProducts();
            }
            // fetchProducts();
          }
        }
     }

     let handleEdit=(details)=>{
      navigate("/admin/editItem",{state:{details}})
    }

  return (

    <div className='adminAllProducts'>

      {
        list.length===0 ?  
          <div className='spinners'>
            <SyncLoader color="#36D7B7" list={list} size={20} />
          </div>
          :
        <>
          <div className='tableContainer'>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Product Image</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {list.map((item,index) => (
                      <tr key={index}>
                          <td>{item.id}</td>
                          <td><img src={item.image} alt="image" className='profile'/></td>
                          <td>{item.name}</td>
                          <td>
                            <div className='action'>
                          
                              <button onClick={()=>navigate(`/admin/viewItem/${item.name}`,{state:{item}})} className='view-btn'>View</button>
                              <button onClick={()=>handleEdit(item)} className='edit-btn'>Edit</button>
                              <button onClick={()=>handleDeleteItem(item.id)} className='delete-btn'  >Delete</button>
                            </div>
                          </td>
                        </tr>
                    ))
                    }
                </tbody>
              
              </table>
            </div>
            <div className='addProduct' >
              <button onClick={()=>navigate("/admin/addItem")}>Add New Item</button>
            </div>
        </>
      }


    </div>
  )
}

export default AdminAllItems
