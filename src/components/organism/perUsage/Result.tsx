import React, { useState, useEffect, MouseEvent } from "react";
import styled, { keyframes, css } from "styled-components";
import { ChemicalData } from "../../../types";
import Table from "./Table";


const ResultWrapper = styled.section`
  width: 840px;
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
  font-size: 20px;
`;

interface StyleProps {
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

const HighlightBox = styled.span`
  background-color: ${({ theme }) => theme.highlight};
  padding: 0 4px;
  margin: 0 2px;
  border-radius: 4px;
`;

interface Props {
  data: Array<ChemicalData>;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

const Result = ({ data, clickToSearch }: Props) => {
  let disposableN = 0;
  let reusableN = 0;
  let VOCsFromDisposable: Array<string> = [];
  let VOCsFromReusable: Array<string> = [];

  const [click, setClick] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => setClick(!click);

  useEffect(() => {
    click ? setShow(true) : setShow(false);
  }, [click]);

  data.map((product) =>
    product.usage === "일회용" ? disposableN++ : reusableN++
  );

  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    if (product.usage === "일회용") {
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
            VOCsFromDisposable.push(key);
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
            VOCsFromReusable.push(key);
          }
        }
      }
    }
  }

  VOCsFromDisposable = VOCsFromDisposable.filter(
    (v, i, arr) => arr.indexOf(v) === i
  );
  VOCsFromReusable = VOCsFromReusable.filter(
    (v, i, arr) => arr.indexOf(v) === i
  );

  // 일회용 생리용품에서만 검출된 VOCs
  let OnlyInDisposable = VOCsFromDisposable.filter(
    (x) => !VOCsFromReusable.includes(x)
  );
  // 다회용 생리용품에서만 검출된 VOCs
  let OnlyInReusable = VOCsFromReusable.filter(
    (x) => !VOCsFromDisposable.includes(x)
  );
  // 일외용과 다회용 모두에서 검출된 VOCs
  let DetectedInBoth = VOCsFromDisposable.filter((x) =>
    VOCsFromReusable.includes(x)
  );

  return (
    <ResultWrapper>
      <Paragraph>
        2020년 12월 식약처에서 모니터링한 총 385개의 생리용품 가운데 일회용은{" "}
        {disposableN}개로 전체의{" "}
        {`${((disposableN / (disposableN + reusableN)) * 100).toFixed(2)}%`},
        다회용은 {reusableN}개로 전체의{" "}
        {`${((reusableN / (disposableN + reusableN)) * 100).toFixed(2)}%`}을
        차지했다. 모니터링 대상이었던 총 60종의 VOCs 가운데
        <HighlightBox>
          일회용 생리용품에서 검출된 VOCs는 총 {VOCsFromDisposable.length}종,
          다회용 생리용품에서 검출된 VOCs는 총 {VOCsFromReusable.length}종이었다.
          이 가운데 일회용과 다회용 모두에서 검출된 VOCs는 {DetectedInBoth.length}종,
          일회용에서만 검출된 VOCs는 {OnlyInDisposable.length}종,
          다회용에서만 검출된 VOCs는 {OnlyInReusable.length}종으로
          다회용에서 검출된 VOCs 모두 일회용에서도 검출
        </HighlightBox>
        된 것으로 나타났다.
      </Paragraph>
      <TableTitle onClick={handleToggle}>
        <Toggle onClick={handleToggle} show={show} /> [표] 일회용과 다회용
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
