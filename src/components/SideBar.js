import React from "react";
import styled from "styled-components";

const SideBar = ({ open }) => {
  return (
    <Nav open={open}>
      <NavItem>생리용품 VOCs 검출 정보</NavItem>
      <NavItem>생리용품 VOCs 검출 정보</NavItem>
      <NavItem>생리용품 VOCs 검출 정보</NavItem>
      <NavItem>생리용품 VOCs 검출 정보</NavItem>
    </Nav>
  );
};

export default SideBar;

const Nav = styled.section`
  width: 300px;
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
  font-size: 16px;
  font-weight: 400;
  padding: 5px 20px;
  width: 100%;
`;
