/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { FiFile, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const MOBILE_BREAKPOINT = "768px";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${(props) => (props.isPanelOpen ? "width: 68%;" : "width: 100%;")};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100% !important;
    padding: 0 1rem;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 2px solid #cccccc;

  & > h2 {
    text-shadow: 0px 4px 4px 0px #00000040;
  }
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    h2 {
      font-size: 1.8rem;
    }
    padding: 1rem 0;
  }
`;
const BackButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    padding: 1rem 0;
    gap: 1rem;
  }
`;

const GridItem = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 8px;
  border-radius: 8px;
  overflow: hidden;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    height: 15rem;
  }
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    & > h3 {
      font-size: 2.2rem;
    }
    & > p {
      font-size: 1.6rem;
    }
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const RemovePackageButton = styled.button`
  /* flex: 1; */
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 15px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #d93838;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 1.2rem;
    width: 100%;
  }
`;

const PropertiesButton = styled.button`
  flex: 1;
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #237ab8;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 1.2rem;
    width: 100%;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    top: 0;
    height: 100%;
    padding: 2rem 2rem;
  }
`;

const DetailsHeader = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
  line-height: 1.1;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
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
`;

function ApprovedPackages() {
  const packages = Array.from({ length: 16 }, (_, index) => ({
    id: index,
    name: `Package ${index + 1}`,
    price: `$${250 + index * 10}`,
    rating: `${(4.0 + index * 0.1).toFixed(1)}/5`,
  }));

  const navigate = useNavigate();
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
          <h2>Approved Packages</h2>
          <BackButton onClick={() => navigate(-1)}>
            Back <ArrowRight size={24} strokeWidth={2} color="#2a93d5" />
          </BackButton>
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
              <ActionButtonsContainer>
                <RemovePackageButton>
                  <span>
                    <FiTrash2 />
                  </span>{" "}
                  Remove Package
                </RemovePackageButton>
                <PropertiesButton onClick={handlePropertiesClick}>
                  <span>
                    <FiFile />
                  </span>{" "}
                  Properties
                </PropertiesButton>
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

export default ApprovedPackages;
