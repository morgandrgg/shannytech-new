import React, { useRef, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';

const nav_links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  }
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const allQuantity = useSelector((state) => state.wish.totalQuantity);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profileActionsVisible, setProfileActionsVisible] = useState(false);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    });
  };

  const logout = () =>{
    signOut(auth).then((
        toast.success('Logged Out'),
        navigate('/home')
    )).catch(err=>{
        toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active_menu');

  const navigateToWish = () => {
    navigate('/wish');
  };
  const navigateToCart = () => {
    navigate('/cart');
  };

  const toggleProfileActions = () => {
    setProfileActionsVisible((prevValue) => !prevValue);
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">            
            <div className="logo">
              <Link to='/' className='logo'>
                <img src={logo} alt="logo" className="logo-img" />
                <div>
                  <h1>ShannyTech</h1>
                </div>
              </Link>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} className={(navClass)=> navClass.isActive ? 'nav_active':''}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons">
              <span className="fav_icon" onClick={navigateToWish}>
                <i className="ri-heart-line"></i>
                <span className="badge">{allQuantity}</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />

                {profileActionsVisible && (
                  <div className="profile_actions" ref={profileActionRef} onClick={toggleProfileActions}>
                    {currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : (
                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                        {/* <Link to="/dasboard">Dashboard</Link> */}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle} className="cart_icon">
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
