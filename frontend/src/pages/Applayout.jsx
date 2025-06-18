/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* height: max-content; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scroll-behavior: smooth;
  /* border: 0.5rem solid red; */
`;

const MainBody = styled.main`
  /* margin-top: 10vh; */
  flex: 1;
  background-color: #fff;

`;

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const layout = document.getElementById("layout");

    const handleScroll = () => {
      setIsScrolled(layout.scrollTop > 50);
    };

    layout.addEventListener("scroll", handleScroll);
    return () => layout.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout id="layout">
      <Navbar isScrolled={isHomePage ? isScrolled : true} isHomePage={isHomePage}/>
      <MainBody>
        <Outlet />
      </MainBody>
    </Layout>
  );
}


export default AppLayout;
