/* eslint-disable no-unused-vars */
import { useRef } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 5rem 0 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 3rem;
  margin-top: 3rem;
  letter-spacing: 3px;
  color: #000;
  font-family: "Integral CF", sans-serif;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 74vw;
  padding: 2rem;
  overflow-x: scroll;
  padding-bottom: 3rem;

  @media (max-width: 768px) {
    width: 95vw;
    padding: 5rem 2.5rem;
    padding-bottom: 2rem;
  }
`;

const Slider = styled.div`
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
  margin-bottom: 5rem;
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  /* border: 2px solid red; */
  width: 250px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  /* border-radius: 38px; */
  /* padding: 16px; */
  /* box-shadow: var(--shadow-sm); */
  margin: 0 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 220px;
    height: 320px;
    margin: 0 5px;
  }
`;

const Image = styled.img`
  width: 90%;
  height: 250px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    width: 95%;
    height: 250px;
  }
`;

const PlaceName = styled.h3`
  font-weight: bold;
  /* color: var(--color-grey-800); */
  text-align: center;
  letter-spacing: 1px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

`;

const Price = styled.p`
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;

`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

const RightArrow = styled(ArrowButton)`
  right: 0;
`;

const ScrollbarContainer = styled.div`
  width: 90%;
  margin-top: 1rem;
`;

const Scrollbar = styled.input`
  width: 100%;
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--color-main);
    }
  }
`;

function PopularPackages() {
  const packages = [
    {
      id: 1,
      name: "Golden Triangle",
      location: "Delhi-Agra-Jaipur",
      price: "From ₹24,999",
      duration: "6 Days",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      name: "Kerala Backwaters",
      location: "Kerala",
      price: "From ₹32,999",
      duration: "5 Days",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Goa Beach Retreat",
      location: "Goa",
      price: "From ₹18,999",
      duration: "4 Days",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Rajasthan Heritage",
      location: "Rajasthan",
      price: "From ₹29,999",
      duration: "8 Days",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
      rating: 4.9,
      featured: true,
    },
    {
      id: 5,
      name: "Varanasi Spiritual Tour",
      location: "Uttar Pradesh",
      price: "From ₹22,999",
      duration: "4 Days",
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca",
      rating: 4.8,
    },
    {
      id: 6,
      name: "Darjeeling Tea Trails",
      location: "West Bengal",
      price: "From ₹26,999",
      duration: "5 Days",
      image: "https://images.unsplash.com/photo-1544634076-a90160ddf44c",
      rating: 4.8,
    },
  ];
  const sliderRef = useRef(null);

  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleScrollbarChange = (event) => {
    if (sliderRef.current) {
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const scrollValue = (event.target.value / 100) * maxScroll;
      sliderRef.current.scrollLeft = scrollValue;
    }
  };

  return (
    <Section id="popularPackages" className="bg-blue-100/50 w-full relative">
      <Heading>Popular Packages</Heading>
      <SliderContainer>
        <Slider ref={sliderRef}>
          {packages.map((pkg, index) => (
            <Card key={index} style={{background:  `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${pkg.image}) no-repeat center center/cover`}}
            className="rounded-2xl text-white relative cursor-pointer overflow-hidden">
              <div className="absolute bottom-0 bg-black/30 w-full !py-3">
                <PlaceName>{pkg.name}</PlaceName>
                <Price>{pkg.price}</Price>
              </div>
            </Card>
          ))}
        </Slider>
      </SliderContainer>
    </Section>
  );
}

export default PopularPackages;
