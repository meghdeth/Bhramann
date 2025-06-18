import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "../../components/Dashboard/SellerDashboard/Header";
import Sidebar from "../../components/Dashboard/SellerDashboard/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 4rem;
    height: 100dvh;
    overflow: auto;
  }
`;
const BodyContainer = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const MainBody = styled.main`
  flex: 1;
  padding: 20px 0;
  padding-left: 20px;
  background-color: #ffffff;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// FOR MOBILE
const HamburgerButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;
const MobileSidebarWrapper = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
    height: 100vh;
    width: 250px;
    background-color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease;
    z-index: 999;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DashboardContainer>
      <HamburgerButton onClick={toggleSidebar}>
        <Menu/>
      </HamburgerButton>
      <Header />
      <BodyContainer>
        <MobileSidebarWrapper isOpen={isSidebarOpen}>
          <Sidebar onClose={() => setIsSidebarOpen(!isSidebarOpen)}/>
        </MobileSidebarWrapper>
        <Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
        <MainBody>
          <Outlet />
        </MainBody>
      </BodyContainer>
    </DashboardContainer>
  );
}

export default DashboardLayout;
