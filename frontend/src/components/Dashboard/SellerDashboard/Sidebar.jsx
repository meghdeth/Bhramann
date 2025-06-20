/* eslint-disable react/prop-types */
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Calendar, CreditCard, Home, Package, Settings, X } from "lucide-react";

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

const links = [
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
    path: "/seller-dashboard/seller-settings",
    label: "Settings",
    icon: Settings,
  }
]
function Sidebar({ onClose }) {
  return (
    <SidebarContainer>
      <CloseButton onClick={onClose}><X /></CloseButton>
      <ItemContainer>
        {links.map((link, index) => {
          return (
            <SidebarLink key={index} to={link.path} onClick={onClose} {...(link.path === "/seller-dashboard" ? { end: true } : {})}>
              <Icon>
                <link.icon className="size-8"/>
              </Icon>
              {link.label}
            </SidebarLink>
          );
        })}
      </ItemContainer>
    </SidebarContainer>
  );
}

export default Sidebar;
