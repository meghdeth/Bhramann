import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiAmericanexpress,
  SiDiscover,
} from "react-icons/si";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  width: 100%;
  color: grey;
  padding: 5rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-poppins);
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const FirstRow = styled.div`
  /* background-color: red; */
  display: flex;
  width: 90%;
  margin-bottom: 2rem;
  /* border: 2px solid white; */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  margin: 0 1.5rem;
  /* max-width: 25%; */
  text-align: left;

  @media (max-width: 768px) {
    margin: 1rem 0;
    text-align: center;
    width: 100%;
  }
`;

const FooterHeading = styled.h3`
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FooterLink = styled.a`
  display: block;
  margin-bottom: 0.5rem;
  color: grey;
  text-decoration: none;
  font-weight: 300;
  letter-spacing: 1px;

  &:hover, &:focus {
    color: #fff;
  }
  transition: all 0.2s ease-in-out;
  font-family: var(--font-poppins);
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  & > svg {
    cursor: pointer;
    &:hover{
      color: #fff;
    }
}
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 0.1px solid grey;
  width: 90%;
  margin: 2rem auto;
`;

const SecondRow = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CopyrightText = styled.p`
  margin: 0;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
    gap: 0.5rem;
  }
`;

function Footer() {
  return (
    <FooterContainer id="footer">
      {/* First Row */}
      <FirstRow>
        <FooterColumn>
          <FooterHeading>Support</FooterHeading>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Safety Information</FooterLink>
          <FooterLink href="#">Cancellation Options</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Company</FooterHeading>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Community Blogs</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink href="#">Get in Touch</FooterLink>
          <FooterLink href="#">Partnerships</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Social</FooterHeading>
          <SocialIcons>
            <FaFacebookF size={20} />
            <FaTwitter size={20} />
            <FaInstagram size={20} />
            <FaYoutube size={20} />
          </SocialIcons>
        </FooterColumn>
      </FirstRow>

      {/* Divider Line */}
      <Divider />

      {/* Second Row */}
      <SecondRow>
        <CopyrightText>© Copyright ascends 2024</CopyrightText>
        <PaymentIcons>
          <SiVisa size={30} />
          <SiMastercard size={30} />
          <SiPaypal size={30} />
          <SiAmericanexpress size={30} />
          <SiDiscover size={30} />
        </PaymentIcons>
      </SecondRow>
    </FooterContainer>
  );
}

export default Footer;
