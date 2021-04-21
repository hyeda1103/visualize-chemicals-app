import React from "react";
import styled from "styled-components/macro";

type Props = {
  search: string;
  close: boolean;
  clickToClose: () => void;
};

const Dictionary = ({ search, close, clickToClose }: Props) => {
  return (
    <Section close={close}>
      <Drag onClick={clickToClose}>{close ? "열기" : "닫기"}</Drag>
      <ResultWrapper>
        검색어
        <SearchKeyword>{search}</SearchKeyword>
      </ResultWrapper>
    </Section>
  );
};

export default Dictionary;

type StyleProps = {
  close: boolean;
};

const Section = styled.section<StyleProps>`
  position: fixed;
  right: 0;
  top: 60px;
  width: ${({ close }) => (close ? "0" : "30%")};
  height: 100vh;
  padding: 112px 0;
  border-left: 2px dashed ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  align-items: center;
  z-index: 1;
`;

const ResultWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const SearchKeyword = styled.h1`
  font-size: 30px;
`;

const Drag = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  width: 100px;
  text-align: center;
  margin-left: -65px;
  cursor: pointer;
  transform: rotate(270deg);
  padding: 5px 0;
  border-radius: 15px 15px 0 0;
  font-size: 14px;
  font-weight: 300;
  z-index: 1;
  letter-spacing: 4px;
`;
