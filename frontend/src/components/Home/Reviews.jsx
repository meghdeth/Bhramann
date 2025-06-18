import { Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ReviewsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://images.unsplash.com/photo-1469474968028-56623f02e42e") center center/cover no-repeat;
  font-family: var(--font-poppins);
  padding: 6rem 0;
  background-Attachment: fixed;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h2`
  color: white;
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  margin-bottom: 3rem;
  font-family: "Integral CF", sans-serif;
  letter-spacing: 4px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    letter-spacing: 2px;
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  z-index: 2;
  padding: 2rem;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 1rem;
  }
`;

const ReviewBox = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem;
  }
`;

const LeftColumn = styled.div`
  flex: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 2px solid #eeeeee;
  padding-right: 2rem;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid #eeeeee;
    padding-right: 0;
    padding-bottom: 2rem;
  }
`;

const ReviewText = styled.p`
  font-size: 1.8rem;
  font-family: var(--font-poppins);
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
  line-height: 1.8;
  text-align: justify;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    text-align: left;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    /* font-size: 1.2rem; */
    line-height: 1.6;
  }
`;

const RightColumn = styled.div`
  flex: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 2rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-left: 0;
    text-align: center;
  }
`;

const UserPhoto = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #f5f5f5;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
  }
`;

const UserName = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  color: #222;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const UserDesignation = styled.p`
  color: #666;
  letter-spacing: 1px;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PlaceVisited = styled.p`
  letter-spacing: 1px;
  color: #444;
  font-size: 1.4rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

function Reviews() {
  return (
    <ReviewsSection id="reviews">
      <Overlay />
      <Heading>
        What Our Travelers Say
      </Heading>
      <ReviewsContainer>
        <ReviewBox>
          <LeftColumn>
            <ReviewText>
              <div className="flex items-center gap-1 !mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-8 text-yellow-400 fill-current" />
                ))}
                <p className="!ml-5">5 / 5</p>
              </div>
                <Quote className="size-12 text-gray-500 opacity-20" />
              An incredible experience! The tour was perfectly organized, and the destinations were breathtaking. Our guide was knowledgeable and friendly, making the whole journey memorable.
            </ReviewText>
          </LeftColumn>
          <RightColumn>
            <UserPhoto src="/user.jpg" alt="User 1" />
            <UserName>John Doe</UserName>
            <UserDesignation>Student</UserDesignation>
            <PlaceVisited>Visited Kerala</PlaceVisited>
          </RightColumn>
        </ReviewBox>

        <ReviewBox>
          <LeftColumn>
            <ReviewText>
            <div className="flex items-center gap-1 !mb-5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="size-8 text-yellow-400 fill-current" />
                ))}
                {[...Array(1)].map((_, i) => (
                  <Star key={i} className="size-8 text-gray-300" />
                ))}
                <p className="!ml-5">4 / 5</p>
              </div>
                <Quote className="size-12 text-gray-500 opacity-20" />
              Beyond expectations! From the initial booking to the final day, everything was seamless. The attention to detail and the unique experiences made this trip unforgettable.
            </ReviewText>
          </LeftColumn>
          <RightColumn>
            <UserPhoto src="/user.jpg" alt="User 2" />
            <UserName>Jane Smith</UserName>
            <UserDesignation>Engineer</UserDesignation>
            <PlaceVisited>Visited Himachal</PlaceVisited>
          </RightColumn>
        </ReviewBox>
      <Link to="reviews" className="secondary-btn !text-center">See More Stories</Link>
      </ReviewsContainer>
    </ReviewsSection>
  );
}

export default Reviews;
