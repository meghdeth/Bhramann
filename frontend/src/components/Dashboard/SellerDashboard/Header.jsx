import styled from "styled-components";
import { FiBell, FiMessageSquare, FiUser } from "react-icons/fi";

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background-color: transparent;
  border-bottom: 1px solid #00000080;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 10px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #ffffff;
    padding-top: 0.5rem;
  }
`;

const LeftSection = styled.div`
  color: black;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    letter-spacing: 1px;
    margin-left: 5rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  color: black;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <LeftSection>DASHBOARD</LeftSection>
      <RightSection>
        <Icon>
          <FiBell />
        </Icon>
        <Icon>
          <FiMessageSquare />
        </Icon>
        <Icon>
          <FiUser />
        </Icon>
      </RightSection>
    </HeaderContainer>
  );
}

export default Header;
