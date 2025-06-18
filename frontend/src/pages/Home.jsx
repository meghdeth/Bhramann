import styled from "styled-components";
import Reviews from "../components/Home/Reviews";
import PopularPackages from "../components/Home/PopularPackages";
import TopDestinations from "../components/Home/TopDestinations";
import InfoCarousel from "../components/Home/InfoCarousel";
import Footer from "../components/Footer/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

function Home() {
  return (
    <Container>
      <InfoCarousel />
      <TopDestinations />
      <PopularPackages />
      <Reviews />
      <Footer/>
    </Container>
  );
}

export default Home;
