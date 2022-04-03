import React, { useState, useEffect, MouseEvent } from "react";
import styled, { keyframes, css } from "styled-components";

import * as T from "../../../types";
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
  chemicalData: Array<T.ChemicalData>;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

function Result ({ chemicalData, clickToSearch }: Props) {
  const [disposableProducts, setDisposableProducts] = useState<Array<T.ChemicalData>>()
  const [reusableProducts, setReusableProducts] = useState<Array<T.ChemicalData>>()
  const [NumOfDisposableProducts, setNumOfDisposableProducts] = useState<number>()
  const [NumOfReusableProducts, setNumOfReusableProducts] = useState<number>()
  const [PercentOfDisposableProducts, setPercentOfDisposableProducts] = useState<string>()
  const [PercentOfReusableProducts, setPercentOfReusableProducts] = useState<string>()
  const [VOCsFromDisposableProducts, setVOCsFromDisposableProducts] = useState<Array<string>>([])
  const [VOCsFromReusableProducts, setVOCsFromReusableProducts] = useState<Array<string>>([])

  const [OnlyInDisposableProducts, setOnlyInDisposableProducts] = useState<Array<string>>([])
  const [OnlyInReusableProducts, setOnlyInReusableProducts] = useState<Array<string>>([])
  const [DetectedOnBoth, setDetectedOnBoth] = useState<Array<string>>([])
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => setShow(!show);
  
  useEffect(() => {
    const disposableProducts = chemicalData.filter((product) => product.usage === T.Usage.DISPOSABLE)
    setDisposableProducts(disposableProducts)
    const reusableProducts = chemicalData.filter((product) => product.usage === T.Usage.REUSABLE)
    setReusableProducts(reusableProducts)
    setNumOfDisposableProducts(disposableProducts.length)
    setNumOfReusableProducts(reusableProducts.length)    
  }, [chemicalData])
  
  useEffect(() => {
    if (NumOfDisposableProducts === undefined) return;
    if (NumOfReusableProducts === undefined) return;
    const percentageOfDisposableProducts = ((NumOfDisposableProducts / (NumOfDisposableProducts + NumOfReusableProducts)) * 100).toFixed(2)
    const percentageOfReuableProducts = ((NumOfReusableProducts / (NumOfDisposableProducts + NumOfReusableProducts)) * 100).toFixed(2)

    setPercentOfDisposableProducts(`${percentageOfDisposableProducts}%`)
    setPercentOfReusableProducts(`${percentageOfReuableProducts}%`)
  }, [NumOfDisposableProducts, NumOfReusableProducts])

  useEffect(() => {
    if (disposableProducts === undefined) return;
    if (reusableProducts === undefined) return;
    disposableProducts.forEach((product) => {
      const chemicalInfo = Object.entries(product) 
      chemicalInfo.forEach((singleChemical) => {
        const chemicalName = singleChemical[0]
        const ingredientContent = Number(singleChemical[1])
        if (!['index', 'distribution', 'company', 'productName', 'usage'].includes(chemicalName)
          && ingredientContent > 0 && VOCsFromDisposableProducts.indexOf(chemicalName) === -1) {
          setVOCsFromDisposableProducts([...VOCsFromDisposableProducts, chemicalName])
        }
      })
    })
    reusableProducts.forEach((product) => {
      const chemicalInfo = Object.entries(product) 
      chemicalInfo.forEach((singleChemical) => {
        const chemicalName = singleChemical[0]
        const ingredientContent = Number(singleChemical[1])
        if (!['index', 'distribution', 'company', 'productName', 'usage'].includes(chemicalName)
          && ingredientContent > 0 && VOCsFromReusableProducts.indexOf(chemicalName) === -1) {
          setVOCsFromReusableProducts([...VOCsFromReusableProducts, chemicalName])
        }
      })
    })
  }, [disposableProducts, reusableProducts, VOCsFromDisposableProducts, VOCsFromReusableProducts])

  useEffect(() => {
    // 일회용 생리용품에서만 검출된 VOCs
    const OnlyInDisposable = VOCsFromDisposableProducts.filter(
      (x) => !VOCsFromReusableProducts.includes(x)
    );
    setOnlyInDisposableProducts(OnlyInDisposable)
    // 다회용 생리용품에서만 검출된 VOCs
    const OnlyInReusable = VOCsFromReusableProducts.filter(
      (x) => !VOCsFromDisposableProducts.includes(x)
    );
    setOnlyInReusableProducts(OnlyInReusable)
    // 일외용과 다회용 모두에서 검출된 VOCs
    const DetectedOnBoth = VOCsFromDisposableProducts.filter((x) =>
      VOCsFromReusableProducts.includes(x)
    );
    setDetectedOnBoth(DetectedOnBoth)
  }, [VOCsFromDisposableProducts, VOCsFromReusableProducts])


  return (
    <ResultWrapper>
      <Paragraph>
        2020년 12월 식약처에서 모니터링한 총 385개의 생리용품 가운데 일회용은{" "}
        {NumOfDisposableProducts}개로 전체의{" "}
        {PercentOfDisposableProducts},
        다회용은 {NumOfReusableProducts}개로 전체의{" "}
        {PercentOfReusableProducts}을
        차지했다. 모니터링 대상이었던 총 60종의 VOCs 가운데
        <HighlightBox>
          일회용 생리용품에서 검출된 VOCs는 총 {VOCsFromDisposableProducts.length}종,
          다회용 생리용품에서 검출된 VOCs는 총 {VOCsFromReusableProducts.length}종이었다.
          이 가운데 일회용과 다회용 모두에서 검출된 VOCs는 {DetectedOnBoth.length}종,
          일회용에서만 검출된 VOCs는 {OnlyInDisposableProducts.length}종,
          다회용에서만 검출된 VOCs는 {OnlyInReusableProducts.length}종으로
          다회용에서 검출된 VOCs 모두 일회용에서도 검출
        </HighlightBox>
        된 것으로 나타났다.
      </Paragraph>
      <TableTitle onClick={handleToggle}>
        <Toggle onClick={handleToggle} show={show} /> [표] 일회용과 다회용
        생리용품에서 모두 검출된 {DetectedOnBoth.length}종의 VOCs에 대한 통계
      </TableTitle>
      <TableBody show={show}>
        <Table
          chemicalData={chemicalData}
          detectedOnBoth={DetectedOnBoth}
          clickToSearch={clickToSearch}
        />
      </TableBody>
    </ResultWrapper>
  );
};

export default Result;
