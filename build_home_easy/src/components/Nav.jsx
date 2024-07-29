import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import "../css/nav.css"
// import '.../css/nav.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { RiLogoutBoxRLine } from "react-icons/ri";
import { toast } from 'react-toastify';



const Nav = ({list,addedCart,userDetails}) => {
    console.log("nav userDetails",userDetails)

    let navigate=useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    let [nameList,setNameList]=useState([])

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    let [checkUserLogin,setCheckUserLogin]=useState('')
    let [checkAdminLogin,setCheckAdminLogin]=useState('')

    useEffect(()=>{
    },[list,addedCart, userDetails, checkUserLogin,checkAdminLogin,userDetails,addedCart, searchQuery,filteredItems,searchPerformed])


    useEffect(()=>{
        let user=localStorage.getItem('user')
        setCheckUserLogin(user)
        // console.log("user",checkUserLogin)
    },[])

   
    useEffect(()=>{
        let admin=localStorage.getItem('admin')
        setCheckAdminLogin(admin)   
        // console.log("admin",checkAdminLogin)
    },[])

    useEffect(()=>{
        setNameList(list)
        console.log("nameList",nameList)
    },[list])

    useEffect(() => {
        filterItems();
        // console.log("filteredItems2 ",filteredItems)
    }, [searchQuery,nameList]);
   
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    }; 
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const filterItems = () => {
       
        if (!searchQuery) {
            setFilteredItems([]);
            setSearchPerformed(false)
        } else {
            setSearchPerformed(true)
            const filtered = nameList.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(filtered);
            // console.log("filteredItems",filteredItems)
        }
    };




  return (
    <>
        {
            checkAdminLogin 
            ? 
            <>
                <div className='nav'>
                    <div className='logo-name'>
                        <img src="../assests/home-logo.png" alt="img" />
                        <div className='name'>
                            <h3>Build</h3>
                            <h3>Home</h3>
                            <h3>Easy</h3>
                        </div>
                    </div>

           
                    <div className='burger'>
                        {/* <Link to={'/test1'}><GiHamburgerMenu color="white"/></Link> */}
                        <GiHamburgerMenu color="white" onClick={toggleSidebar}/>
                    </div>
                    <div className='search-profile-name'>
                        {/* <input type="text" placeholder='Search here....'/> */}
                            <input 
                                type="text" 
                                placeholder='Search here....' 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {filteredItems.length > 0 && (
                                <div className='search-results'>
                                    {filteredItems.map((item, index) => (
                                        <div key={index} className='search-result-item'>
                                            {/* <NavLink to={`/admin/viewItem/${item.name}`} onClick={() => setSearchQuery('')}>
                                                {item.name}
                                            </NavLink> */}
                                            <button onClick={()=>{ navigate(`/admin/viewItem/${item.name}`,{state:{item}}) ; setSearchQuery('')} }  style={{fontSize:'0.75vw',border:'none',backgroundColor:'white',cursor:'pointer'}}>
                                                {item.name}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {
                                searchPerformed && filteredItems.length === 0 && (
                                    <div className='search-results' style={{color:'black'}}>
                                        No results found
                                    </div>
                                )
                            }
                        <div className='name-profile'>
                            {
                                checkAdminLogin ?
                                <>
                                    <h3 style={{fontSize:'1vw'}} >Admin 
                                        <RiLogoutBoxRLine  
                                            onClick={()=>{
                                                if(window.confirm('Are You Sure')){
                                                    localStorage.removeItem('admin');
                                                    navigate('/login')
                                                }
                                            }}
                                        /> 
                                    </h3>  
                                </>
                                :
                                <>
                                    <h3 onClick={()=>navigate('/login')} style={{fontSize:'1vw'}} >Login</h3>
                                </>
                            }
                            {/* <h3>Name</h3> */}
                            {/* <img src="xxx" alt="Profile" /> */}
                            <CgProfile className="icon" onClick={toggleProfile} />
                        </div>
                    </div>
                </div>

                <div 
                    className={`overlay ${isOpen || isProfileOpen ? 'open' : ''}`} 
                    onClick={() => { setIsOpen(false); setIsProfileOpen(false); }} >
                </div>

                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <div className='links'>
                        <NavLink to='/adminDashboard' className={(e)=>{return e.isActive?"active":" "}} >Dashboard</NavLink>
                        <NavLink to='/admin/users' className={(e)=>{return e.isActive?"active":" "}} >Users</NavLink>
                        <NavLink to='/admin/allItems' className={(e)=>{return e.isActive?"active":" "}} >Items</NavLink>
                        <NavLink to='/admin/orders' className={(e)=>{return e.isActive?"active":" "}} >Orders</NavLink>
                        <NavLink to='/admin/contact' className={(e)=>{return e.isActive?"active":" "}} >Contact</NavLink>
                    </div>
                </div>

                <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
                    <NavLink to='/adminProfile' className={(e)=>{return e.isActive?"active":" "}} >Profile</NavLink>
                    {/* <div onClick={()=>navigate('/adminProfile')} className='active' >Profile</div> */}
                    <div  className='active'
                        // style={{width:'100%',height:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}
                        onClick={()=>{
                            if(window.confirm('Are you sure')){
                                localStorage.removeItem('admin');
                                navigate('/login')
                            }
                        }}>Logout
                    </div>
                </div>
            </>

            :       //user

            <>

                <div className='nav'>
                    <div className='logo-name'>
                        <img src="../assests/home-logo.png" alt="img" />
                        <div className='name'>
                            <h3>Build</h3>
                            <h3>Home</h3>
                            <h3>Easy</h3>
                        </div>
                    </div>

           
                    <div className='burger'>
                        {/* <Link to={'/test1'}><GiHamburgerMenu color="white"/></Link> */}
                        <GiHamburgerMenu color="white" onClick={toggleSidebar}/>
                    </div>
                    <div className='search-profile-name'>
                        {/* <input type="text" placeholder='Search here....'/> */}
                            <input 
                                type="text" 
                                placeholder='Search here....' 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {filteredItems.length > 0 && (
                                <div className='search-results'>
                                    {filteredItems.map((item, index) => (
                                        <div key={index} className='search-result-item'>
                                            <div onClick={() => {setSearchQuery(''); navigate(`/item/${item.name}`,{state:{item}} )}}>
                                                {item.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {
                                searchPerformed && filteredItems.length === 0 && (
                                    <div className='search-results' style={{color:'black'}}>
                                        No results found
                                    </div>
                                )
                            }
                        <div className='name-profile'>
                            {
                                checkUserLogin ?
                                <>
                                    <h3 style={{fontSize:'1.1vw'}} > {userDetails.first_name} 
                                        <RiLogoutBoxRLine
                                            onClick={()=>{
                                                if(window.confirm('Are You Sure')){
                                                    localStorage.removeItem('user');
                                                    toast.success('Logout Successful')
                                                    navigate('/login')
                                                }   
                                        }}/> 
                                    </h3>  
                                </>
                                :
                                <>
                                    <h3 onClick={()=>navigate('/login')} style={{fontSize:'1vw'}} >Login</h3>
                                </>
                            }
                         
                            {/* <h3>Name</h3> */}
                            {/* <img src="xxx" alt="Profile" /> */}
                            <CgProfile className="icon" onClick={toggleProfile} />
                        </div>
                    </div>
                </div>

                <div 
                    className={`overlay ${isOpen || isProfileOpen ? 'open' : ''}`} 
                    onClick={() => { setIsOpen(false); setIsProfileOpen(false); }} >
                </div>
     
            
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                        <div className='links'>
                            <NavLink to='/' className={(e)=>{return e.isActive?"active":" "}} >Home</NavLink>
        
                            <div onClick={toggleCategory} className='category' >Category</div>
                            { isCategoryOpen && 
                                    <div className={`category-dropdown-menu ${isCategoryOpen ? 'open' : ''}`}>
                                        {
                                            list.map((item,index)=>(
                                                // <NavLink to={`/item/${item.name}`} key={index} className="categoryName">{item.name}</NavLink>
                                                <div key={index} onClick={()=>navigate(`/item/${item.name}`,{state:{item}} )}  className="categoryName">{item.name}</div>
                                            ))
                                        }
                                    </div>
                            }
                            
                            <NavLink to='/contact' className={(e)=>{return e.isActive?"active":" "}} >Contact</NavLink>
                            <NavLink to='/about' className={(e)=>{return e.isActive?"active":" "}} >About</NavLink>
                        </div>
                </div>

                <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
                        <NavLink to={'/profile'} className={(e)=>{return e.isActive?"active":" "}} >My Profile</NavLink>
                        <NavLink to={'/cart'} > My Orders <p className='myOrder'>{addedCart.length}</p></NavLink>
                        {
                            checkUserLogin ?
                            <>
                                <div className='active'
                                    onClick={()=>{
                                        if(window.confirm('Are you sure')){
                                            localStorage.removeItem('user');
                                            toast.success('Logout Successful');
                                            to=('/login')
                                        }
                                    }}
                                >Logout
                                </div>
                            </>
                            :
                            <NavLink to='/login'>Login</NavLink>
                        }
                      
                </div>
            </>
        }
        
    </>
  )
}

export default Nav
