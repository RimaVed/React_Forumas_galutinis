import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 100px;
  border: 3px solid black;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <h1>&copy; 2023 Forum</h1>
    </StyledFooter>
  );
};

export default Footer;
