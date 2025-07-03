// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';
// import ProfileDropdown from './ProfileDropdown.jsx';
import api from '../../api';
import { getUser, clearAuth } from '../../auth';

// Styled components
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const BrandName = styled(Link)`
  font-size: 2.5rem;
  letter-spacing: 3px;
  font-style: var(--brand-font-1);
  color: #fff;
  text-decoration: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid transparent;
  position: relative;
  &:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.3s ease;
  &:hover { opacity: 0.8; }
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 400px;
  height: 100dvh;
  background-color: #1a1a1a;
  z-index: 1001;
  transition: right 0.3s ease-in-out;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 3rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: grey;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: white; }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  flex: 1;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 2rem;
  color: grey;
  &:hover { color: white; }
  &::before { height: 0; }
`;

const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
`;

// Main component
export default function Navbar({ isScrolled, isHomePage }) {
  const [user, setUser] = useState(getUser());
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load orders when we have a user
  useEffect(() => {
    if (!user) return;
    api
      .get('/api/orders/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders:', err));
  }, [user]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const tripCount = orders.length;

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <Nav className={isScrolled ? '!py-4 bg-black/60 backdrop-blur-md' : '!py-8 bg-transparent'}>
        <BrandName to="/"><img src='/bhramann_logo.svg' className='w-45'/></BrandName>

        {isHomePage && (
          <NavLinks>
            <NavLink onClick={() => document.getElementById('pageTop')?.scrollIntoView({ behavior: 'smooth' })}>HOME</NavLink>
            <NavLink onClick={() => document.getElementById('topDestinations')?.scrollIntoView({ behavior: 'smooth' })}>EXPLORE</NavLink>
            <NavLink onClick={() => document.getElementById('popularPackages')?.scrollIntoView({ behavior: 'smooth' })}>PACKAGES</NavLink>
            <NavLink onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>REVIEW</NavLink>
            <NavLink onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}>CONTACT</NavLink>
          </NavLinks>
        )}

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <ShoppingCart className="size-10 text-white" />
            {tripCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {tripCount}
              </span>
            )}
          </Link>

          {user ? (
            <div>
              <Link to={user.role === "seller" ? "/seller-dashboard" : "/user-dashboard"} className='!text-white'>
               Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link to="/signup">
                <button className="secondary-btn hidden md:block">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="primary-btn hidden md:block">Login</button>
              </Link>
            </>
          )}

          <HamburgerButton onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </HamburgerButton>
        </div>
      </Nav>

      <MobileMenu isOpen={isOpen}>
        <MobileNavHeader>
          <CloseButton onClick={() => setIsOpen(false)}>
            <X size={24} />
          </CloseButton>
        </MobileNavHeader>

        {isHomePage && (
          <MobileNavLinks>
            <MobileNavLink onClick={() => { setIsOpen(false); document.getElementById('pageTop')?.scrollIntoView({ behavior: 'smooth' }); }}>HOME</MobileNavLink>
            <MobileNavLink onClick={() => { setIsOpen(false); document.getElementById('topDestinations')?.scrollIntoView({ behavior: 'smooth' }); }}>EXPLORE</MobileNavLink>
            <MobileNavLink onClick={() => { setIsOpen(false); document.getElementById('popularPackages')?.scrollIntoView({ behavior: 'smooth' }); }}>PACKAGES</MobileNavLink>
            <MobileNavLink onClick={() => { setIsOpen(false); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }}>REVIEW</MobileNavLink>
            <MobileNavLink onClick={() => { setIsOpen(false); document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' }); }}>CONTACT</MobileNavLink>
          </MobileNavLinks>
        )}

        <MobileButtons>
          {user ? (
            <button onClick={handleLogout} className="primary-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <button className="secondary-btn">Sign Up</button>
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="primary-btn">Login</button>
              </Link>
            </>
          )}
        </MobileButtons>
      </MobileMenu>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
}
