import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleSideBar } from "./../modules/sideBar";

type Props = {
  open: boolean;
};

const SideBar = ({ open }: Props) => {
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다
  const onClick = () => {
    dispatch(handleSideBar());
  };
  return (
    <Nav open={open}>
      <NavItem to="/VOCs" onClick={onClick}>
        2020 생리용품별 VOCs 검출 결과
      </NavItem>
      <NavItem to="/" onClick={onClick}>
        2020 생리용품별 PCBs 검출 결과
      </NavItem>
      <NavItem to="/" onClick={onClick}>
        국내유통 및 해외직구 검출 결과 비교
      </NavItem>
      <NavItem to="/" onClick={onClick}>
        일회용과 다회용 검출 결과 비교
      </NavItem>
      <NavItem to="/" onClick={onClick}>
        검출 실험 방법에 따른 결과 비교
      </NavItem>
      <NavItem to="/" onClick={onClick}>
        단체별 검출 실험 결과 비교
      </NavItem>
    </Nav>
  );
};

export default SideBar;

const Nav = styled.section<Props>`
  height: calc(100vh - 60px);
  top: 60px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  position: absolute;
  z-index: 1;
  padding: 20px;
  background: #363537;
  transition: 0.6s ease;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-weight: 300;
  padding: 15px 20px;
  width: 100%;
  letter-spacing: 1.4px;
  cursor: pointer;
  display: block;
  color: #f6f5f0;
`;
