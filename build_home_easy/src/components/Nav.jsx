import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "../css/nav.css"
// import '.../css/nav.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";



const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    }; 
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    
  return (
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
                <input type="text" placeholder='Search here....'/>
                <div className='name-profile'>
                    <h3>Name</h3>
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
            {/* <ul> */}
            <div className='links'>
                <NavLink to='/' className={(e)=>{return e.isActive?"active":" "}} >Home</NavLink>

                <NavLink onClick={toggleCategory}  >Category</NavLink>
                { isCategoryOpen && 
                        <div className={`category-dropdown-menu ${isCategoryOpen ? 'open' : ''}`}>
                            <NavLink to='/category/item1'  >Item 1</NavLink>
                            <NavLink to='/category/item2'  >Item 2</NavLink>
                            <NavLink to='/category/item3'  >Item 3</NavLink>
                        </div>
                }
                
                <NavLink to='/contact' className={(e)=>{return e.isActive?"active":" "}} >Contact</NavLink>
                <NavLink to='/about' className={(e)=>{return e.isActive?"active":" "}} >About</NavLink>
            </div>
            {/* </ul> */}
        </div>

        <div className={`profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
                <NavLink to='/profile' className={(e)=>{return e.isActive?"active":" "}} >My Profile</NavLink>
                <NavLink to='/orders'>My Orders</NavLink>
                <NavLink to='/logout'>Logout</NavLink>
        </div>
      
        
    </>
  )
}

export default Nav
