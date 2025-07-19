import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
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
  display: flex;
  width: 90%;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  margin: 0 1.5rem;
  text-align: left;
  @media (max-width: 768px) {
    margin: 0;
    text-align: center;
    width: 100%;
  }
`;

const FooterHeading = styled.h3`
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: #fff;
  font-size: 1.6rem;
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
  &:hover,
  &:focus {
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
    &:hover {
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
  text-align: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const CopyrightText = styled.p`
  color: grey;
  font-size: 1.5rem;
`;

const PaymentIcons = styled.div`
  display: flex;
  gap: 1rem;
  & > svg {
    font-size: 2rem;
    cursor: default;
  }
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
          <FooterHeading>Services</FooterHeading>
          <FooterLink href="#">Trip Packages</FooterLink>
          <FooterLink href="#">Hostel Listings</FooterLink>
          <FooterLink href="#">Student Visa Assistance</FooterLink>
          <FooterLink href="#">Conference Visa Support</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Company</FooterHeading>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Press</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Support</FooterHeading>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">FAQs</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Safety & Security</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Connect</FooterHeading>
          <SocialIcons>
            <FaFacebookF size={20} />
            <FaLinkedin size={20} />
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
        <CopyrightText>© 2025 Bhramann Hive Pvt. Ltd.</CopyrightText>
        
      </SecondRow>
    </FooterContainer>
  );
}

export default Footer;
