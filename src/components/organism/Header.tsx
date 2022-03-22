import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { handleSideBar } from "../../modules/sideBar";
import Toggle from "../molecule/Toggle";


const Container = styled.header`
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.text}; 
  color: ${({ theme }) => theme.text}; 
  position: fixed;
  z-index: 3;
  padding: 0 1%;
`;

const StyledBurger = styled.div<{ open: boolean }>`
  width: 30px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;

  div {
    width: 30px;
    height: 3px;
    background: ${({ theme }) => theme.text}; 
    transform-origin: center;

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
      transition: 0.25s ease;
    }

    &:nth-child(3) {
      width: ${({ open }) => (open ? "27px" : "30px")};
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      top: 8px;
      position: absolute;
      transition: 0.25s ease;
    }

    &:nth-child(4) {
      opacity: ${({ open }) => (open ? 0 : 1)};
      top: 16px;
      position: absolute;
      width: 30px;
    }
  }
`;

const ThemeSwitch = styled.div`
  position: absolute;
  width: 44px;
  height: 100%;
  right: 1%;
  display: flex;
  align-items: center;
`;


interface Props {
  handleToggle: () => void;
};

const Header = ({ handleToggle }: Props) => {
  const open = useSelector((state: RootState) => state.sideBar.open);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(handleSideBar());
  return (
    <Container>
      {/* 햄버거 메뉴 */}
      <StyledBurger open={open} onClick={handleClick}>
        <div />
        <div />
        <div />
        <div />
      </StyledBurger>
      {/* light, dark 모드 토글 */}
      <ThemeSwitch>
        <Toggle themeToggler={handleToggle} />
      </ThemeSwitch>
    </Container>
  );
};

export default Header;
