import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../css/adminViewItem.css"

const AdminViewItem = () => {

    let {item}=useLocation().state
    let {name,image,items}=item
    
    let [storedItem,setStoredItem]=useState(items)

    useEffect(()=>{
        // setStoredItem(items)
        // console.log("view item",items)
        console.log("storedItem",storedItem)
    },[])
   

    let navigate=useNavigate()

  return (
    <div className='adminViewItem'>
        <div className='tableContainer'>
            <table>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {storedItem.map((item,index) => (
                    <tr key={index}>
                        {/* <td>{item.id}</td> */}
                        <td><img src={item.itemImage} alt="image" className='profile'/></td>
                        <td>{item.itemName}</td>
                        <td>{item.itemPrice}</td>
                        <td>
                            <div className='action'>
                                <button onClick={()=>navigate("/admin/viewItem",{state:{item}})} className='view-btn'>View</button>
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
            <button onClick={()=>navigate("/admin/addChildItem",{state:{item}})}>Add New Item</button>
        </div>

    </div>
  )
}

export default AdminViewItem
