import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { handleSideBar } from "./../modules/sideBar";

import SideBar from "./SideBar";
import Toggle from "./Toggle";

type Props = {
  themeToggler: () => void;
};

const Header = ({ themeToggler }: Props) => {
  // 상태를 조회합니다. 상태를 조회 할 때에는 state 의 타입을 RootState 로 지정해야합니다.
  const open = useSelector((state: RootState) => state.sideBar.open);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const onClick = () => {
    dispatch(handleSideBar());
  };
  return (
    <>
      <Nav>
        {/* 햄버거 메뉴 */}
        <StyledBurger open={open} onClick={onClick}>
          <div />
          <div />
          <div />
          <div />
        </StyledBurger>
        {/* light, dark 모드 토글 */}
        <ThemeSwitch>
          <Toggle themeToggler={themeToggler} />
        </ThemeSwitch>
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
  top: 0;
  left: 0;
  background: #363537;
  color: #f6f5f0;
  position: fixed;
  z-index: 1;
  padding: 0 1%;
`;

type BurgerProps = {
  open: boolean;
};

const StyledBurger = styled.div<BurgerProps>`
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

const ThemeSwitch = styled.div`
  position: absolute;
  width: 44px;
  height: 100%;
  right: 1%;
  display: flex;
  align-items: center;
`;
