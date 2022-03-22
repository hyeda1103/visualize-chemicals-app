import React from "react";
import styled, { css } from "styled-components";
import { IoMdSunny, IoMdMoon } from "react-icons/io";


const ToggleContainer = styled.button`
  position: relative;
  background: ${({ theme }) => theme.background};
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = css`
  position: absolute;
  margin: auto 0;
  font-size: 28px;
  padding: 1px;
  color: ${({ theme }) => theme.text};
  transition: 0.1s ease;
`;

const SunIcon = styled(IoMdSunny)`
  ${Icon}
  opacity: ${({ theme }) => (theme.mode === "light" ? "1" : "0")};
`;

const MoonIcon = styled(IoMdMoon)`
  ${Icon}
  opacity: ${({ theme }) => (theme.mode === "light" ? "0" : "1")};
`;

interface Props {
  themeToggler: () => void;
};

const Toggle = ({ themeToggler }: Props) => {
  return (
    <ToggleContainer onClick={themeToggler}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

export default Toggle;
