/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import topDestinationsBg from "../../assets/images/top-destinations-bg.svg"

const Section = styled.section`
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  // margin-top: 4rem;
  background: url(${topDestinationsBg}) center center/cover no-repeat;
  background-size: 100% 100%;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 3rem;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: "Integral CF", sans-serif;

  color: #000;
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 52rem;
  width: 60%;
  @media (max-width: 768px) {
    width: 95%;
    height: auto;
  }
`;

const Slider = styled.div`
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
  overflow-x: scroll;
  padding: 5rem 2.5rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  min-width: ${(props) => (props.isHighlighted ? "300px" : "270px")};
  height: ${(props) => (props.isHighlighted ? "400px" : "370px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 10px;
  transform: ${(props) =>
    props.isHighlighted ? "scale(1.1) translateY(-10px)" : "scale(1)"};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: ${(props) =>
    props.isHighlighted ? "0 8px 16px rgba(0, 0, 0, 0.3)" : "none"};
  @media (max-width: 768px) {
    min-width: 250px;
    height: 350px;
    margin: 0 5px;
  }
`;

const Image = styled.img`
  width: 91%;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: 1rem;
  margin-top: 1.2rem;
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const PlaceName = styled.h3`
  font-weight: bold;
  color: var(--color-grey-800);
  margin: 12px 0 4px;
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  /* font-family: var(--font-poppins); */
`;


function TopDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Jaipur",
      country: "Rajasthan",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
      rating: 4.8
    },
    {
      id: 3,
      name: "Varanasi",
      country: "Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca",
      rating: 4.9
    },
    {
      id: 4,
      name: "Kerala Backwaters",
      country: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
      rating: 4.7
    },
    {
      id: 5,
      name: "Ladakh",
      country: "Jammu & Kashmir",
      image: "https://images.unsplash.com/photo-1619837374214-f5b9eb80876d",
      rating: 4.9
    },
    {
      id: 6,
      name: "Darjeeling",
      country: "West Bengal",
      image: "https://images.unsplash.com/photo-1544634076-a90160ddf44c",
      rating: 4.8
    },
    {
      id: 7,
      name: "Andaman Islands",
      country: "Andaman & Nicobar",
      image: "https://images.unsplash.com/photo-1559628933-a151ff460406",
      rating: 4.8
    }
  ];
  const sliderRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(1);

  const updateHighlight = () => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const cardWidth = 280; // Average width of a card (including margin)
      const maxScrollLeft = container.scrollWidth - containerWidth;
  
      // If scrolled near the start, highlight the first card
      if (scrollLeft <= 10) {
        setHighlightedIndex(0);
        return;
      }
  
      // If scrolled near the end, highlight the last card
      if (scrollLeft >= maxScrollLeft - 10) {
        setHighlightedIndex(destinations.length - 1);
        return;
      }
  
      // Calculate the center position of the viewport
      const centerViewport = containerWidth / 2;
      
      // Determine which card should be centered
      const centerCard = Math.round(
        (scrollLeft + centerViewport - cardWidth / 2) / cardWidth
      );
  
      setHighlightedIndex(centerCard);
    }
  };
  

  useEffect(() => {
    const currentRef = sliderRef.current;

    if (currentRef) {
      currentRef.addEventListener("scroll", updateHighlight);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", updateHighlight);
      }
    };
  }, []);

  return (
    <Section id="topDestinations" className="relative bg-gradient-to-b from-[#f1f7fe] to-white min-h-screen">
      <div className="flex items-center gap-3">
        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        <h3 className="text-xl text-blue-500 font-medium tracking-wide">EXPLORE THE WORLD</h3>
        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
      </div>
      <Heading>Top Destinations</Heading>
      <SliderContainer>
        <Slider ref={sliderRef}>
          {destinations.map((destination, index) => (
            <Card
              key={index}
              isHighlighted={index === highlightedIndex}
              className={`${index === highlightedIndex ? "!ring-4 !ring-blue-500/80" : ""}`}
            >
              <Image src={destination.image} alt="Location Image" />
              <PlaceName>{`${destination.name}, ${destination.country}`}</PlaceName>
            </Card>
          ))}
        </Slider>
      </SliderContainer>
        <div className="flex justify-center mt-12 md:mt-8">
          <div className="flex gap-2">
            {destinations.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === highlightedIndex 
                    ? "bg-blue-500 w-8" 
                    : "bg-gray-300 !cursor-default"
                }`}
              />
            ))}
          </div>
        </div>
    </Section>
  );
}

export default TopDestinations;
