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
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: ${(props) => (props.isSearchActive ? 1 : 0)};
    transition: opacity 0.3s ease;
    background: rgba(0,0,0,0.4);
    backdrop-filter: ${(props) => (props.isSearchActive ? 'blur(3px)' : 'none')};
    z-index: 2;
  }
`;

const SliderInfo = styled.div`
  position: absolute;
  top: 30%;
  transform: translateY(-50%);
  
  @media (max-width: 768px) {
    font-size: 3rem;
    top: 25%;
    letter-spacing: 2px;
    }
    `;

const InfoText = styled.h3`
    font-weight: bold;
    text-align: center;
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
    font-family: "Integral CF Bold", sans-serif;
    letter-spacing: 5px;
  font-size: 4rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
}`;

const SubText = styled.p`
  font-weight: 600;
  margin-top: 5px;
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
}`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    bottom: 60%;
  }
  filter: ${(props) => (props.isSearchActive ? 'blur(2px) brightness(0.7)' : 'none')};
  transition: filter 0.3s ease;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 55%;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    top: 35%;
    transform: translateY(50%);
    padding: 0 20px;
  }
`;

const Dot = styled.div`
  width: ${(props) => (props.isActive ? "40px" : "10px")};
  height: 10px;
  background-color: ${(props) => (props.isActive ? "white" : "grey")};
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, width 0.3s ease, height 0.3s ease;
  opacity: ${(props) => (props.isSearchActive ? 0.5 : 1)};
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
  const [isSearchActive, setIsSearchActive] = useState(false);
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
            isSearchActive={isSearchActive}
            style={{
              background: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${slide.image}) no-repeat center center/cover`,
            }}
          >
            <SliderInfo>
              <InfoText>{slide.text}</InfoText>
              <SubText>{slide.subtext}</SubText>
            </SliderInfo>
          </Slide>
        ))}
      </SlideContainer>
      <DotContainer isSearchActive={isSearchActive}>
        {slides.map((_, index) => (
          <Dot
            key={index}
            isActive={index === activeIndex}
            isSearchActive={isSearchActive}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotContainer>

      <SearchContainer>
        <div
          onMouseEnter={() => setIsSearchActive(true)}
          onMouseLeave={() => setIsSearchActive(false)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          tabIndex={-1}
        >
          <SearchBox />
        </div>
      </SearchContainer>
    </CarouselSection>
  );
}

export default InfoCarousel;
