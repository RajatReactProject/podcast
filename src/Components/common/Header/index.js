import React from 'react';
import "./style.css"
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div>
        <div className='navbar'>
          <div className='gradient'></div>
          <div className='links'>
            <Link to="/" className={currentPath === "/"?"active":""}>SignUp</Link>
            <Link to="/podcasts" className={currentPath === "/podcasts"?"active":""}>Podcast</Link>
            <Link to="/create-a-podcast" className={currentPath === "/create-a-podcast"?"active":""}>Start Podcast</Link>
            <Link to="/profile" className={currentPath === "/profile"?"active":""}>Profile</Link>
          </div>
        </div>
    </div>
  )
}

export default Header;