import React from "react";
import GravitiLogo from "../../Assets/Images/GravitiLogo1.svg";
import Styled from "styled-components";
const Header = () => {
  return (
    <div>
      <Graviti>
        <img src={GravitiLogo} alt="" />
      </Graviti>
    </div>
  );
};

export default Header;

const Graviti = Styled.div`
   padding : 5px 50px;
   display: flex;
   justify-content: left;
   align-items: center;
`;
