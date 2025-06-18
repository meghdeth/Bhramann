/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FiEdit, FiFile } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  /* border: 2px solid red; */
  /* border-style: dashed; */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const SearchBox = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
  border: 1px solid #8b8b8b;
  border-radius: 5px;
  text-align: left;
  min-width: 20%;
  box-shadow: -2px -2px 4px 0px #00000040;
  box-shadow: 2px 2px 4px 0px #00000040;

  &:focus {
    outline: none;
    border-color: #2a93d5;
  }
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 2px solid #aaaaaa;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin-top: 1rem;
  /* border: 2px solid green; */
  /* border-style: dotted; */
  height: 80%;
`;

const LeftColumn = styled.div`
  width: 30%;
  max-height: 100%;
  overflow-y: auto;
  border-right: 2px solid #cccccc;
  /* border: 2px solid blue; */

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SellerItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  box-shadow: 2px 2px 4px 0px #00000040;

  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SellerNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 1rem;
`;

const SellerImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 1rem;
`;

const SellerName = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  /* border: 2px solid green; */
  /* border-style: dotted; */
`;

const SellerDetails = styled.div`
  display: flex;
  margin-bottom: 2rem;
  /* border: 2px solid red; */
  height: 30%;
`;

const SellerImageLarge = styled.img`
  width: 15rem;
  border-radius: 10px;
  margin-right: 2rem;
`;

const SellerInfo = styled.div`
  font-size: 2rem;
  font-weight: bold;

  & > p {
    margin: 0.5rem 0;
  }
`;

const PackagesSection = styled.div`
  flex: 1;
  /* border: 2px solid red; */
  display: flex;
  flex-direction: column;
  height: 60%;
`;

const PackagesHeader = styled.h2`
  font-size: 1.8rem;
  height: 10%;
  /* border: 2px solid red; */
`;

const PackagesGrid = styled.div`
  /* border: 2px solid green; */
  height: 90%;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  overflow-y: auto;
  /* max-height: calc(100% - 2rem); */

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

// const PackageItem = styled.div`
//   padding: 1rem;
//   background-color: #f8f8f8;
//   border-radius: 8px;
//   box-shadow: 0px 4px 4px 0px #00000040;
//   height: 10rem;
// `;

const PackageItem = styled.div`
  display: grid;
  grid-template-rows: 5fr 1fr 1fr;
  gap: 8px;
  border-radius: 8px;
  overflow: hidden;
  height: 30rem;
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

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  gap: 5px;
  text-decoration: none; /* Ensures link appears like a button */

  &:hover {
    background-color: #237ab8;
  }
`;

const RemoveButton = styled.button`
  background-color: #2a93d5;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.6rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #d93838;
  }
`;

// slider
const SlidingPanel = styled.div`
  position: fixed;
  top: 12%;
  left: 0;
  width: 31%;
  height: 85%;
  background-color: #fff;
  border-right: 2px solid #8b8b8b;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
  z-index: 100;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* border: 2px solid red; */
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

const Sellers = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handlePropertiesClick = () => {
    setIsPanelOpen(true);
  };
  const closePanel = () => {
    setIsPanelOpen(false);
  };
  const sellers = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Seller ${index + 1}`,
    image: "/seller-img.png",
    details: `Details about Seller ${index + 1}`,
  }));

  return (
    <>
      <Container>
        <Header>
          <Title>Sellers</Title>
          <SearchBox placeholder="Search sellers..." />
        </Header>
        <HorizontalLine />
        <Content>
          {/* Left Column */}
          <LeftColumn>
            {sellers.map((seller) => (
              <SellerItem
                key={seller.id}
                onClick={() => setSelectedSeller(seller)}
              >
                <SellerNumber>{seller.id}</SellerNumber>
                <SellerImage src={seller.image} alt={seller.name} />
                <SellerName>{seller.name}</SellerName>
              </SellerItem>
            ))}
          </LeftColumn>

          {/* Right Column */}
          <RightColumn>
            {/* Seller Details */}
            {selectedSeller && (
              <SellerDetails>
                <SellerImageLarge
                  src={selectedSeller.image}
                  alt={selectedSeller.name}
                />
                <SellerInfo>
                  <p>
                    <strong>Name:</strong> {selectedSeller.name}
                  </p>
                  <p>
                    <strong>Details:</strong> {selectedSeller.details}
                  </p>
                </SellerInfo>
              </SellerDetails>
            )}

            {/* Packages Section */}
            <PackagesSection>
              <PackagesHeader>Packages</PackagesHeader>
              <PackagesGrid>
                {Array.from({ length: 12 }, (_, index) => (
                  <PackageItem key={index}>
                    <ImageContainer>
                      <PackageDetails>
                        <h3>Coorg - (3N - 2D)</h3>
                        <p>Price: $250</p>
                        <p>⭐ 4.5/5</p>
                      </PackageDetails>
                    </ImageContainer>
                    <ButtonsContainer>
                      <ActionButton
                        as={Link}
                        to="/seller-dashboard/packages/modify-package"
                      >
                        <span>
                          <FiEdit />
                        </span>{" "}
                        Modify Package
                      </ActionButton>
                      <ActionButton onClick={handlePropertiesClick}>
                        <span>
                          <FiFile />
                        </span>{" "}
                        Properties
                      </ActionButton>
                    </ButtonsContainer>
                  </PackageItem>
                ))}
              </PackagesGrid>
            </PackagesSection>
          </RightColumn>
        </Content>
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
};

export default Sellers;
