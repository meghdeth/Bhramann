/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { FiEdit, FiFile } from "react-icons/fi";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${(props) => (props.isPanelOpen ? "width: 68%;" : "width: 100%;")};

  @media (max-width: 768px) {
    /* width: 100% !important; // Override panel state on mobile */
    width: 100%;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 2px solid #cccccc;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    & > div {
      display: flex;
      width: 100%;
      overflow-x: hidden;
      padding-bottom: 0.5rem;
      /* Hide scrollbar but keep functionality */
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  box-shadow: -2px -2px 4px 0px #00000040, 2px 2px 4px 0px #00000040;
  margin-left: 1rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  border: none;
  background: #ffffff;
  font-size: 1.7rem;
  color: #8b8b8b;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 1rem;
    white-space: nowrap;
    padding: 0.8rem 1.5rem;
    font-size: 1.5rem;
    flex-shrink: 0;
    box-shadow: none;
    background-color: #e8e8e8;
    color: #000;
  }
`;

const Packages = styled.div`
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  max-height: 80vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: ${(props) =>
    props.isPanelOpen ? "repeat(3, 1fr)" : "repeat(4, 1fr)"};
  grid-gap: 1.5rem;
  padding-bottom: 3rem;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    grid-template-columns: 1fr !important; // Override panel state on mobile
    gap: 2rem;
    padding: 1rem 0;
  }
`;

const GridItem = styled.div`
  display: grid;
  /* grid-template-rows: 5fr  1fr 1fr; */
  grid-template-rows: auto;
  gap: 8px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: white;
    padding: 1rem;
  }
`;

const ImageContainer = styled.div`
  background-image: url("/package-bg.jpeg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  color: white;
  font-weight: bold;
  height: 100%;
  height: 20rem;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  border-radius: 8px;
`;

const PackageDetails = styled.div`
  letter-spacing: 1.5px;

  & > h3 {
    margin: 0;
    font-size: 3rem;
    font-weight: bold;
  }

  & > p {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const PropertiesButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 1.3rem 0;
  cursor: pointer;
  gap: 10px;

  &:hover {
    background-color: #237ab8;
  }
  /* @media (max-widht: 768px) {
    margin-bottom: 50px;
  } */
`;

const ActionButtonsContainer = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  border: none;
  background-color: #fff;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem 0;
  }
`;

const RemovePackageButton = styled.button`
  flex: 1;
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #d93838;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1.3rem;
    gap: 2px;
  }
`;

const ApprovePackageButton = styled.button`
  flex: 1;
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #237ab8;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 1.3rem;
    gap: 2px;
  }
`;

// slider
const SlidingPanel = styled.div`
  position: fixed;
  top: 10%;
  right: 0;
  width: 31%;
  height: 89%;
  background-color: #fff;
  border-left: 2px solid #8b8b8b;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  z-index: 100;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 2px solid red; */

  @media (max-width: 768px) {
    width: 100%;
    top: 0;
    height: 100dvh;
    padding: 2rem;

    /* Add safe area padding for notched phones */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const DetailsHeader = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  line-height: 1.1;
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const PriceInfo = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333333;
  margin-bottom: 5px;
`;

const Image = styled.div`
  background-image: url("/package-bg.jpeg");
  background-size: cover;
  background-position: center;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ListSection = styled.div`
  margin-bottom: 10px;
`;

const ListHeading = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333333;
  letter-spacing: 1px;
  /* margin-bottom: 10px; */
`;

const ListItem = styled.ul`
  /* list-style-type: circle; */
  list-style-type: disc;
  margin: 0;
  padding-left: 6rem;
  font-size: 1.5rem;
  letter-spacing: 1px;

  & > li {
    /* margin-bottom: 5px; */
  }

  @media (max-width: 768px) {
    padding-left: 3rem;
  }
`;

const ExitButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 20px;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 4rem;
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    background-color: #555555;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: calc(100% - 40px);
    padding: 1.2rem;
  }
`;

function Requests() {
  const packages = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    name: `Package ${index + 1}`,
    price: `$${250 + index * 10}`,
    rating: `${(4.0 + index * 0.1).toFixed(1)}/5`,
  }));

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePropertiesClick = () => {
    setIsPanelOpen(true);
  };
  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <Container isPanelOpen={isPanelOpen}>
        <Header>
          <h2>Requests</h2>
          <div>
            <StyledNavLink to="/superadmin-panel/requests/rejected">
              Rejected Packages
            </StyledNavLink>
            <StyledNavLink to="/superadmin-panel/requests/approved">
              Approved Packages
            </StyledNavLink>
          </div>
        </Header>
        <Packages isPanelOpen={isPanelOpen}>
          {packages.map((pkg, index) => (
            <GridItem key={pkg.id}>
              <ImageContainer>
                <PackageDetails>
                  <h3>{pkg.name}</h3>
                  <p>Price: {pkg.price}</p>
                  <p>⭐ {pkg.rating}</p>
                </PackageDetails>
              </ImageContainer>
              <PropertiesButton onClick={handlePropertiesClick}>
                <span>
                  <FiFile />
                </span>{" "}
                Properties
              </PropertiesButton>
              <ActionButtonsContainer>
                <RemovePackageButton>
                  <span>🗑</span> Remove Package
                </RemovePackageButton>
                <ApprovePackageButton>
                  <span>✔</span> Approve Package
                </ApprovePackageButton>
              </ActionButtonsContainer>
            </GridItem>
          ))}
        </Packages>
      </Container>
      <SlidingPanel isOpen={isPanelOpen}>
        <DetailsHeader>
          Best Tea Plantation of South India - Coorg (3N-2D) Package
        </DetailsHeader>
        <PriceInfo>Price: $250 Per person</PriceInfo>
        <Image />
        <ListSection>
          <ListHeading>Highlighted Spots:</ListHeading>
          <ListItem>
            <li>Abbey Waterfalls</li>
            <li>Omkareshwara Temple</li>
            <li>Mallalli Waterfalls</li>
            <li>Nagaraholl Tiger Reserve</li>
            <li>Dubare Elephant Camp</li>
          </ListItem>
        </ListSection>
        <ListSection>
          <ListHeading>Stays:</ListHeading>
          <ListItem>
            <li>Taj Hotel</li>
            <li>Oberoi Mension</li>
          </ListItem>
        </ListSection>
        <ExitButton onClick={closePanel}>Exit</ExitButton>
      </SlidingPanel>
    </>
  );
}

export default Requests;
