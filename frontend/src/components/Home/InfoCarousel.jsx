import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";

const CarouselSection = styled.section`
  // margin-top: 8vh;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media (max-width: 768px) {
    height: 100dvh;
  }
`;

const SlideContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: transform 1s ease;
  transform: ${(props) => `translateX(-${props.activeIndex * 100}%)`};
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
`;

const InfoText = styled.h2`
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  font-size: 4rem;
  letter-spacing: 5px;
  font-weight: bold;
  text-align: center;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  font-family: "Integral CF Bold", sans-serif;

  @media (max-width: 768px) {
    font-size: 3rem;
    top: 25%;
    letter-spacing: 2px;
  }
  `;

const SubText = styled.p`
  font-size: 2rem;
  text-align: center;
  @media (max-width: 768px) {
    position: absolute;
    top: 35%;
    font-size: 1.5rem;
  }
  }`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 30%;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    bottom: 45%;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  // bottom: 1rem;
  bottom: 10%;
  z-index: 10;
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    bottom: 20%;
    transform: translateY(50%);
    padding: 0 20px;
  }
`;

const Dot = styled.div`
  width: ${(props) => (props.isActive ? "40px" : "10px")};
  height: ${(props) => (props.isActive ? "10px" : "10px")};
  background-color: ${(props) => (props.isActive ? "white" : "grey")};
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, width 0.3s ease, height 0.3s ease;

  &:hover {
    background-color: white;
  }
`;

const slides = [
  {
    id: 1,
    text: "Student Discounts",
    subtext: "Unlock exclusive deals—save up to 25% on hostels, tours, and more!",
    image: "https://images.unsplash.com/photo-1482398650355-d4c6462afa0e"
  },
  {
    id: 2,
    text: "Explore on a Budget",
    subtext: "Affordable trips tailored for students",
    image: "https://images.unsplash.com/photo-1591719539805-81516f58dabc"
  },
  {
    id: 3,
    text: "Backpack Adventures",
    subtext: "Discover hidden gems with fellow travelers",
    image: "https://images.unsplash.com/photo-1538422314488-83e8e11d298c"
  },
  {
    id: 4,
    text: "Campus Weekend Escapes",
    subtext: "Recharge between semesters with short getaways",
    image: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc"
  }
];

function InfoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideInterval = useRef(null);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval.current);
  }, []);

  const handleDotClick = (index) => {
    clearInterval(slideInterval.current);
    goToSlide(index);
    slideInterval.current = setInterval(nextSlide, 5000);
  };

  return (
    <CarouselSection id="pageTop">
      <SlideContainer activeIndex={activeIndex}>
        {slides.map((slide) => (
          <Slide
            key={slide.id}
            style={{
              background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${slide.image}) no-repeat center center/cover`,
              // backgroundImage: `url(${slide.image})`,
            }}
          >
            <InfoText>{slide.text}</InfoText>
            <SubText>{slide.subtext}</SubText>
          </Slide>
        ))}
      </SlideContainer>
      <DotContainer>
        {slides.map((_, index) => (
          <Dot
            key={index}
            isActive={index === activeIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotContainer>

      <SearchContainer>
        <SearchBox />
      </SearchContainer>
    </CarouselSection>
  );
}

export default InfoCarousel;
