import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Nav>
        {/* 햄버거 메뉴 */}
        <StyledBurger open={open} onClick={() => setOpen(!open)}>
          <div />
          <div />
          <div />
          <div />
        </StyledBurger>
      </Nav>
      {/* 네비게이션 메뉴 */}
      <SideBar open={open} />
    </>
  );
};

export default Header;

const Nav = styled.section`
  width: 100%;
  height: 60px;
  background: #333;
  color: #f6f5f0;
  position: fixed;
  z-index: 3;
  padding: 0 20px;
`;

const StyledBurger = styled.div`
  width: 30px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  margin: auto 0;

  div {
    width: 30px;
    height: 3px;
    background: #f6f5f0;
    transform-origin: center;
    display: block;

    &:nth-child(1) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      top: 0px;
      position: absolute;
    }

    &:nth-child(2) {
      width: ${({ open }) => (open ? "27px" : "30px")};
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      top: 8px;
      position: absolute;
      transition: 0.6s ease;
    }

    &:nth-child(3) {
      width: ${({ open }) => (open ? "27px" : "30px")};
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      top: 8px;
      position: absolute;
      transition: 0.6s ease;
    }

    &:nth-child(4) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      top: 16px;
      position: absolute;
      width: 18px;
    }
  }
`;
