import React from "react";
import { func } from "prop-types";
import styled from "styled-components";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const Toggle = ({ themeToggler }) => {
  return (
    <ToggleContainer onClick={themeToggler}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

Toggle.propTypes = {
  themeToggler: func.isRequired,
};

export default Toggle;

const ToggleContainer = styled.button`
  position: relative;
  background: ${({ theme }) => theme.background};
  width: 44px;
  height: 30px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  justify-content: space-between;
`;

const SunIcon = styled(IoMdSunny)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 3px;
  margin: auto 0;
  font-size: 19px;
  padding: 1px;
  color: ${({ theme }) => theme.text};
  opacity: ${({ theme }) => (theme.mode === "light" ? "1" : "0")};
  transition: 0.1s ease;
`;

const MoonIcon = styled(IoMdMoon)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1px;
  margin: auto 0;
  font-size: 19px;
  padding: 1px;
  color: ${({ theme }) => theme.text};
  opacity: ${({ theme }) => (theme.mode === "light" ? "0" : "1")};
  transition: 0.1s ease;
`;
