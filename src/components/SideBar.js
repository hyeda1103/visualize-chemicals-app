import React from "react";
import styled from "styled-components";

const SideBar = ({ open }) => {
  return <Nav open={open}></Nav>;
};

export default SideBar;

const Nav = styled.section`
  width: 300px;
  height: 100vh;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  position: absolute;
  z-index: 1;
  background: #333;
  transition: 0.6s ease;
`;
