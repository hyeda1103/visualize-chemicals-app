import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import * as T from '../types';


interface StyleProps {
  close: boolean;
};

const Section = styled.section<StyleProps>`
  position: fixed;
  right: 0;
  top: 60px;
  width: 30%;
  transform: ${({ close }) => (close ? 'translateX(100%)' : 'translateX(0)')};
  height: 100vh;
  padding: 112px 0;
  border-left: 2px dashed ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  align-items: center;
  z-index: 1;
  transition: 0.25s ease;
`

const Inner = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const ResultWrapper = styled.div`
  margin: 13px 0;
`;

const KeywordWrapper = styled.div``;

const SearchKeyword = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-right: 13px;
`;

const English = styled.div`
  font-size: 15px;
`;

const ReferenceWrapper = styled.div``

const Drag = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
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

interface Props {
  search: string | null;
  close: boolean;
  clickToClose: () => void;
};

const Dictionary = ({ search, close, clickToClose }: Props) => {
  const [termData, setTermData] = useState<T.StringObj[]>([]);
  const [defintion, setDefinition] = useState("");
  const [en, setEN] = useState("");
  const [reference, setReference] = useState<any>([])

  const getData = () => {
    fetch("/data/Terminology.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setTermData(json);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    termData.forEach((el) => {
      if (el.term === search) {
        setDefinition(el.definition.toString());
        setEN(el.en.toString());
        setReference(el.reference)
      }
    });
  }, [search, termData]);

  return (
    <Section close={close}>
      <Drag onClick={clickToClose}>{close ? "열기" : "닫기"}</Drag>
      <Inner>
        <KeywordWrapper>
          용어사전
          <SearchKeyword>{search}</SearchKeyword>
          <English>{en}</English>
        </KeywordWrapper>
        <ResultWrapper>{defintion}</ResultWrapper>
        {reference.map((item: string, idx: number) => (
          <ReferenceWrapper key={ `${item}${idx}` }>{ item }</ReferenceWrapper>
        ))}
      </Inner>
    </Section>
  );
};

export default Dictionary;
