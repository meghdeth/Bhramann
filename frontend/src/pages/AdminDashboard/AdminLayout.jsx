import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from '../../components/Logo';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* font-family: "Franklin-Gothic-Demi-Cond"; */
`;

const Header = styled.header`
  background: linear-gradient(180deg, #2a93d5 72.54%, #1286ba 100%);
  padding: 1.5rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    height: 100vh;
    width: 250px;
    background: linear-gradient(180deg, #2a93d5 72.54%, #1286ba 100%);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 8rem;
    gap: 2rem;
    transition: right 0.3s ease-in-out;
    box-shadow: ${({ isOpen }) =>
      isOpen ? "-5px 0 10px rgba(0, 0, 0, 0.1)" : "none"};
    z-index: 999;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
    text-align: center;
    padding: 1rem;
  }
`;

const ProfileIcon = styled(FiUser)`
  color: white;
  font-size: 2.4rem;
  cursor: pointer;
  margin-left: 2rem;

  @media (max-width: 768px) {
    margin: 2rem 0 0 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 4rem;
  background-color: #fff;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

// for mobile
const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AdminContainer>
      <Header>
        <Logo />
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MenuButton>
        <Nav isOpen={isMenuOpen}>
          <StyledNavLink
            to="/superadmin-panel/edits"
            onClick={() => setIsMenuOpen(false)}
          >
            Edits
          </StyledNavLink>
          <StyledNavLink
            to="/superadmin-panel/sellers"
            onClick={() => setIsMenuOpen(false)}
          >
            Sellers
          </StyledNavLink>
          <StyledNavLink
            to="/superadmin-panel/requests"
            onClick={() => setIsMenuOpen(false)}
          >
            Requests
          </StyledNavLink>
          <ProfileIcon />
        </Nav>
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminContainer>
  );
}
export default AdminLayout;
