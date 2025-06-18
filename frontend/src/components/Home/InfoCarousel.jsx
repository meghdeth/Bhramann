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
 { id: 1,
  text: "Discover Luxury Travel",
  subtext: "Experience the world's most exclusive destinations",
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
},
{ 
  id: 2, 
  text: "Unforgettable Adventures", 
  subtext: "Create memories that last a lifetime",
  image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e" 
},
{ 
  id: 3, 
  text: "Pristine Paradise", 
  subtext: "Escape to untouched natural wonders",
  image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21" 
},
{ 
  id: 4, 
  text: "Luxury Redefined", 
  subtext: "Where comfort meets extraordinary",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" 
},
{ 
  id: 5, 
  text: "Beyond Imagination", 
  subtext: "Journey to the extraordinary",
  image: "https://images.unsplash.com/photo-1502528230654-e2161eb9f08a" 
},
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
              background:  `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${slide.image}) no-repeat center center/cover`,
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
