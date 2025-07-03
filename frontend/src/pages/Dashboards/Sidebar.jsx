/* eslint-disable react/prop-types */
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Badge, Calendar, CreditCard, GraduationCap, Home, LogOut, Package, Settings, X } from "lucide-react";
import { clearAuth } from '../../auth';
import { useState } from "react";

const SidebarContainer = styled.nav`
  width: 250px;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    margin: 0;
    padding: 15px;
    padding-top: 60px; // Space for the hamburger menu
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 1rem;
  gap: 10px;
  background-color: #F3F4F6;

  @media (max-width: 768px) {
    box-shadow: none;
    padding: 0.5rem;
    background-color: #fff;
  }
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.8rem;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s, color 0.3s;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    padding: 12px;
  }

  &.active {
    background-color: #2b7fff;
    color: #fff; 

    &:hover {
      background-color: #2b7fff;
      color: #fff;
    }
  }

  &:hover {
    background-color: #d1d5db; /* Gray hover color */
  }
`;


const Icon = styled.div`
  font-size: 2rem;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Optional: Add a close button for mobile
const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2rem;
    color: #333;
    cursor: pointer;
    }
    `;

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user-dashboard');
  const [logoutText, setLogoutText] = useState('Logout');

  const links = isUser
  ? [
      {
        path: "/user-dashboard",
        label: "Home",
        icon: Home,
      },
      {
        path: "/user-dashboard/bookings",
        label: "My Bookings",
        icon: Calendar,
      },
      {
        path: "/user-dashboard/verify-student",
        label: "Verify",
        icon: GraduationCap,
      },
      {
        path: "/user-dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ]
  : [
      {
        path: "/seller-dashboard",
        label: "Home",
        icon: Home,
      },
      {
        path: "/seller-dashboard/packages",
        label: "Packages",
        icon: Package,
      },
      {
        path: "/seller-dashboard/orders",
        label: "Bookings",
        icon: Calendar,
      },
      {
        path: "/seller-dashboard/payments",
        label: "Payments",
        icon: CreditCard,
      },
      {
        path: "/seller-dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    setLogoutText('Logging out...')
    setTimeout(() => {
      clearAuth();
      navigate("/");
    }, 2500);
  };
  return (
    <SidebarContainer>
      <CloseButton onClick={onClose}><X /></CloseButton>
      <ItemContainer>
        {links.map((link, index) => {
          return (
            <SidebarLink key={index} to={link.path} onClick={onClose} {...(link.path === "/seller-dashboard" || "/user-dashboard" ? { end: true } : {})}>
              <Icon>
                <link.icon className="size-8" />
              </Icon>
              {link.label}
            </SidebarLink>
          );
        })}
        <SidebarLink as="button" onClick={handleLogout} className="!text-red-500 hover:!bg-red-400 hover:!text-white">
          <Icon>
            <LogOut className="size-8" />
          </Icon>
          {logoutText}
        </SidebarLink>
      </ItemContainer>
    </SidebarContainer>
  );
}

export default Sidebar;
