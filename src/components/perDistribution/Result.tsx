import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Table from "./Table";

type DataProps = {
  index: number;
  distribution: string;
  usage: string;
  company: string;
  productName: string;
  에틸벤젠: string;
  운데칸: string;
  스티렌: string;
  노나날: string;
  클로로포름: string;
  데카날: string;
  트리클로로에틸렌: string;
  헥사클로로부타디엔: string;
  Dichloromethane: string;
  "1,2-디클로로에탄": string;
  벤젠: string;
  브로모디클로로메탄: string;
  톨루엔: "0.12";
  "1,4-디클로로벤젠": string;
  "(p-, m-, o-)자일렌": string;
  나프탈렌: string;
  헥산: string;
  "(1S)-(-)-알파-피넨": string;
  테트라클로로에틸렌: string;
  "(-)-베타-피넨": string;
  "2-프로판올": string;
  "2-에틸톨루엔": string;
  "2-부타논": string;
  "3-에틸톨루엔": string;
  에틸아세테이트: string;
  "4-에틸톨루엔": string;
  이소옥탄: string;
  "1,2,3-트리메틸벤젠": string;
  "4-메틸-2-펜타논": string;
  "1,2,4-트리메틸벤젠": string;
  옥탄: string;
  "1,3,5-트리메틸벤젠": string;
  "1,1,2-트리클로로에탄": string;
  "1,2-디클로로프로판": string;
  "1,3-디클로로프로판": string;
  사염화탄소: string;
  부틸아세테이트: string;
  "2,4-디메틸펜탄": string;
  클로로벤젠: string;
  "1,2,4,5-테트라메틸벤젠": string;
  노난: string;
  도데칸: string;
  쿠멘: string;
  트리데칸: string;
  프로필벤젠: string;
  테트라데칸: string;
  데칸: string;
  "n-펜타데칸": string;
  "sec-부틸벤젠": string;
  "n-헥사데칸": string;
  "(R)-(+)-리모넨": string;
  에탄올: string;
  "p-시멘": string;
  아세톤: string;
  "1,2,3-트리클로로벤젠": string;
  "1-프로판올": string;
  "n-부틸벤젠": string;
  헵탄: string;
  "1,2-디클로로벤젠": string;
  "1-부탄올": string;
};

type Props = {
  data: DataProps[];
  clickToSearch: string;
};

const Result = ({ data, clickToSearch }: Props) => {
  let domesticN = 0;
  let overseaN = 0;
  let VOCsFromDomestic: string[] = [];
  let VOCsFromOverseas: string[] = [];

  const [click, setClick] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => setClick(!click);

  useEffect(() => {
    click ? setShow(true) : setShow(false);
  }, [click]);

  data.map((product) =>
    product.distribution === "국내유통" ? domesticN++ : overseaN++
  );

  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    if (product.distribution === "국내유통") {
      let arr = Object.entries(product);
      for (let i = 0; i < arr.length; i++) {
        let key = arr[i][0];
        let value = arr[i][1];
        if (value !== "0") {
          if (
            key !== "index" &&
            key !== "distribution" &&
            key !== "company" &&
            key !== "productName" &&
            key !== "usage"
          ) {
            VOCsFromDomestic.push(key);
          }
        }
      }
    } else {
      let arr = Object.entries(product);
      for (let i = 0; i < arr.length; i++) {
        let key = arr[i][0];
        let value = arr[i][1];
        if (value !== "0") {
          if (
            key !== "index" &&
            key !== "distribution" &&
            key !== "company" &&
            key !== "productName" &&
            key !== "usage"
          ) {
            VOCsFromOverseas.push(key);
          }
        }
      }
    }
  }

  VOCsFromDomestic = VOCsFromDomestic.filter(
    (v, i, arr) => arr.indexOf(v) === i
  );
  VOCsFromOverseas = VOCsFromOverseas.filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  // 국내유통 생리용품에서만 검출된 VOCs
  let OnlyInDomestic = VOCsFromDomestic.filter(
    (x) => !VOCsFromOverseas.includes(x)
  );
  // 해외직구 생리용품에서만 검출된 VOCs
  let OnlyInOverseas = VOCsFromOverseas.filter(
    (x) => !VOCsFromDomestic.includes(x)
  );
  // 일외용과 해외직구 모두에서 검출된 VOCs
  let DetectedInBoth = VOCsFromDomestic.filter((x) =>
    VOCsFromOverseas.includes(x)
  );

  return (
    <ResultWrapper>
      <Paragraph>
        2020년 12월 식약처에서 모니터링한 총 385개의 생리용품 가운데 국내유통은{" "}
        {domesticN}개로 전체의{" "}
        {`${((domesticN / (domesticN + overseaN)) * 100).toFixed(2)}%`},
        해외직구은 {overseaN}개로 전체의{" "}
        {`${((overseaN / (domesticN + overseaN)) * 100).toFixed(2)}%`}을
        차지했다. 모니터링 대상이었던 총 60종의 VOCs 가운데 국내유통
        생리용품에서 검출된 VOCs는 총 {VOCsFromDomestic.length}종, 해외직구
        생리용품에서 검출된 VOCs는 총 {VOCsFromOverseas.length}종이었다. 이
        가운데 국내유통과 해외직구 모두에서 검출된 VOCs는{" "}
        {DetectedInBoth.length}종, 국내유통에서만 검출된 VOCs는{" "}
        {OnlyInDomestic.length}종, 해외직구에서만 검출된 VOCs는{" "}
        {OnlyInOverseas.length}종으로 나타났다.
      </Paragraph>
      <TableTitle onClick={handleToggle}>
        <Toggle onClick={handleToggle} show={show} /> [표] 국내유통과 해외직구
        생리용품에서 모두 검출된 {DetectedInBoth.length}종의 VOCs에 대한 통계
      </TableTitle>
      <TableBody show={show}>
        <Table
          data={data}
          detectedInBoth={DetectedInBoth}
          clickToSearch={clickToSearch}
        />
      </TableBody>
    </ResultWrapper>
  );
};

export default Result;

const ResultWrapper = styled.section`
  width: 960px;
  margin: 0 auto;
`;

const Paragraph = styled.div`
  text-align: justify;
  line-height: 2;
  width: 840px;
  margin: 40px auto;
  font-size: 20px;
`;

const TableTitle = styled.div`
  display: flex;
  cursor: pointer;
`;

type StyleProps = {
  show: boolean;
};

const TableBody = styled.div<StyleProps>`
  display: ${({ show }) => (show ? `block` : `none`)};
`;

const OpenToggle = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(90deg);}
`;

const CloseToggle = keyframes`
  0% {transform: rotate(90deg);}
  100% {transform: rotate(0deg);}
`;

const Toggle = styled.div<StyleProps>`
  margin-right: 13px;
  margin-top: 1px;
  cursor: pointer;
  ${(props) =>
    props.show
      ? css`
          animation: ${OpenToggle} 0.1s ease;
        `
      : css`
          animation: ${CloseToggle} 0.1s ease;
        `}
  transform-origin: 60% 50%;
  transform: ${({ show }) => (show ? `rotate(90deg)` : `rotate(0deg)`)};
  &:after {
    display: inline-block;
    width: 0px;
    height: 0px;
    content: "";
    border-left: 11px solid ${({ theme }) => theme.text};
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }
`;
