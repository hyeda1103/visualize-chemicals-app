import React from "react";
import styled from "styled-components";

const SideBar = ({ open }) => {
  return (
    <Nav open={open}>
      <NavItem>2020 VOCs 검출 결과</NavItem>
      <NavItem>2020 PCBs 검출 결과</NavItem>
    </Nav>
  );
};

export default SideBar;

const Nav = styled.section`
  height: calc(100vh - 60px);
  top: 60px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  position: absolute;
  z-index: 1;
  padding: 20px;
  background: #363537;
  color: #f6f5f0;
  transition: 0.6s ease;
`;

const NavItem = styled.div`
  font-size: 18px;
  font-weight: 300;
  padding: 15px 20px;
  width: 100%;
  letter-spacing: 1.4px;
  cursor: pointer;
`;
