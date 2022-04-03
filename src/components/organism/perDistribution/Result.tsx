import React, { useState, useEffect, MouseEvent } from "react";
import styled, { keyframes, css } from "styled-components";

import * as T from '../../../types'
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
    payload: { e: MouseEvent<HTMLElement, globalThis.MouseEvent>; };
  };
};

function Result({ chemicalData, clickToSearch }: Props) {
  const [domesticProducts, setDomesticProducts] = useState<Array<T.ChemicalData>>()
  const [overseaProducts, setOverseaProducts] = useState<Array<T.ChemicalData>>()
  const [NumOfDomesticProducts, setNumOfDomesticProducts] = useState<number>()
  const [NumOfOverseaProducts, setNumOfOverseaProducts] = useState<number>()
  const [PercentOfDomesticProducts, setPercentOfDomesticProducts] = useState<string>()
  const [PercentOfOverseaProducts, setPercentOfOverseaProducts] = useState<string>()
  const [VOCsFromDomesticProducts, setVOCsFromDomesticProducts] = useState<Array<string>>([])
  const [VOCsFromOverseaProducts, setVOCsFromOverseaProducts] = useState<Array<string>>([])

  const [OnlyInDomesticProducts, setOnlyInDomesticProducts] = useState<Array<string>>([])
  const [OnlyInOverseaProducts, setOnlyInOverseaProducts] = useState<Array<string>>([])
  const [DetectedOnBoth, setDetectedOnBoth] = useState<Array<string>>([])
  const [show, setShow] = useState<boolean>(false);

  const handleToggle = () => setShow(!show);
  
  useEffect(() => {
    const domesticProducts = chemicalData.filter((product) => product.distribution === T.Distribution.DOMESTIC)
    setDomesticProducts(domesticProducts)
    const overseaProducts = chemicalData.filter((product) => product.distribution === T.Distribution.OVERSEA)
    setOverseaProducts(overseaProducts)
    setNumOfDomesticProducts(domesticProducts.length)
    setNumOfOverseaProducts(overseaProducts.length)    
  }, [chemicalData])
  
  useEffect(() => {
    if (NumOfDomesticProducts === undefined) return;
    if (NumOfOverseaProducts === undefined) return;
    const percentageOfDisposableProducts = ((NumOfDomesticProducts / (NumOfDomesticProducts + NumOfOverseaProducts)) * 100).toFixed(2)
    const percentageOfReuableProducts = ((NumOfOverseaProducts / (NumOfDomesticProducts + NumOfOverseaProducts)) * 100).toFixed(2)

    setPercentOfDomesticProducts(`${percentageOfDisposableProducts}%`)
    setPercentOfOverseaProducts(`${percentageOfReuableProducts}%`)
  }, [NumOfDomesticProducts, NumOfOverseaProducts])
  
  useEffect(() => {
    if (domesticProducts === undefined) return;
    if (overseaProducts === undefined) return;
    domesticProducts.forEach((product) => {
      const chemicalInfo = Object.entries(product) 
      chemicalInfo.forEach((singleChemical) => {
        const chemicalName = singleChemical[0]
        const ingredientContent = Number(singleChemical[1])
        if (!['index', 'distribution', 'company', 'productName', 'usage'].includes(chemicalName)
          && ingredientContent > 0 && VOCsFromDomesticProducts.indexOf(chemicalName) === -1) {
          setVOCsFromDomesticProducts([...VOCsFromDomesticProducts, chemicalName])
        }
      })
    })
    overseaProducts.forEach((product) => {
      const chemicalInfo = Object.entries(product) 
      chemicalInfo.forEach((singleChemical) => {
        const chemicalName = singleChemical[0]
        const ingredientContent = Number(singleChemical[1])
        if (!['index', 'distribution', 'company', 'productName', 'usage'].includes(chemicalName)
          && ingredientContent > 0 && VOCsFromOverseaProducts.indexOf(chemicalName) === -1) {
          setVOCsFromOverseaProducts([...VOCsFromOverseaProducts, chemicalName])
        }
      })
    })
  }, [domesticProducts, overseaProducts, VOCsFromDomesticProducts, VOCsFromOverseaProducts])

  useEffect(() => {
    // 국내유통 생리용품에서만 검출된 VOCs
    const OnlyInDomestic = VOCsFromDomesticProducts.filter(
      (x) => !VOCsFromOverseaProducts.includes(x)
    );
    setOnlyInDomesticProducts(OnlyInDomestic)
    // 해외직구 생리용품에서만 검출된 VOCs
    const OnlyInOversea = VOCsFromOverseaProducts.filter(
      (x) => !VOCsFromDomesticProducts.includes(x)
    );
    setOnlyInOverseaProducts(OnlyInOversea)
    // 국내유통과 해외직구 생리용품 모두에서 검출된 VOCs
    const DetectedOnBoth = VOCsFromDomesticProducts.filter((x) =>
      VOCsFromOverseaProducts.includes(x)
    );
    setDetectedOnBoth(DetectedOnBoth)
  }, [VOCsFromDomesticProducts, VOCsFromOverseaProducts])
  
  return (
    <ResultWrapper>
      <Paragraph>
        2020년 12월 식약처에서 모니터링한 총 385개의 생리용품 가운데 국내유통은{" "}
        {NumOfDomesticProducts}개로 전체의{" "}
        {PercentOfDomesticProducts},
        해외직구은 {NumOfOverseaProducts}개로 전체의{" "}
        {PercentOfOverseaProducts}을
        차지했다. 모니터링 대상이었던 총 60종의 VOCs 가운데
        <HighlightBox>
          국내유통 생리용품에서 검출된 VOCs는 총 {VOCsFromDomesticProducts.length}종,
          해외직구 생리용품에서 검출된 VOCs는 총 {VOCsFromOverseaProducts.length}종이었다.
          이 가운데 국내유통과 해외직구 모두에서 검출된 VOCs는{" "}
          {DetectedOnBoth.length}종, 국내유통에서만 검출된 VOCs는{" "}
          {OnlyInDomesticProducts.length}종, 해외직구에서만 검출된 VOCs는{" "}
          {OnlyInOverseaProducts.length}종
        </HighlightBox>
        으로 나타났다.
      </Paragraph>
      <TableTitle onClick={handleToggle}>
        <Toggle onClick={handleToggle} show={show} /> [표] 국내유통과 해외직구
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
