import styled from "styled-components";
import ReviewsComponent from "../components/Reviews/ReviewsComponent";
import ShareExperience from "../components/Reviews/ShareExperience";

const Container = styled.div`
  margin-top: 15vh;
  /* border: 0.5rem solid red; */
  @media (max-width: 768px) {
    margin-top: 10vh;
  }
`;

const Heading = styled.h1`
  text-align: center;
  letter-spacing: 2px;
  font-size: 2.5rem;
  font-weight: bold;
`;

function Reviews() {
  return (
    <Container>
      <Heading>Traveler Stories</Heading>
      <ReviewsComponent />
      <ShareExperience />
    </Container>
  );
}

export default Reviews;
