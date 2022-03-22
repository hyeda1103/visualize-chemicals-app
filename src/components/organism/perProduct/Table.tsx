import React, { useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";
import * as T from '../../../types/index';


const GridContainer = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Row = styled.div`
  width: 840px;
  display: grid;
  grid-template-columns: repeat(7, auto);
  border-bottom: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  margin: 0 auto;
  align-items: center;
  height: 100%;

  &:last-child {
    border-bottom: 0;
  }
`;

const TH = styled.div`
  padding: 10px;
  text-align: flex-start;
  width: 180px;
  box-sizing: border-box;
  line-height: 2;
  border-right: 1px solid ${({ theme }) => theme.text};
`;

const TD = styled.div`
  padding: 14px;
  text-align: center;
  width: calc((840px - 180px) / 6);
  border-right: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:last-child {
    border-right: 0;
  }
`;

const Box = styled.span`
  padding: 1px 10px;
  border: 1px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border-radius: 10px;
  transition: 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.text};
  }
`;

interface Props {
  data: Array<T.ChemicalData>;
  chemicalInfo?: T.StringObj;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

const Table = ({ data, chemicalInfo, clickToSearch }: Props) => {
  const [chemicalList, setChemicalList] = useState<Array<string>>([]);
  const table: T.StringObj[][] = [];

  useEffect(() => {
    if (chemicalInfo) {
      setChemicalList(Object.keys(chemicalInfo));
    }
  }, [chemicalInfo]);

  // 검출된 화학물질에 대한 통계수치 계산
  if (chemicalList) {
    const tableInfo = chemicalList.map((chemical) => {
      const detectedPerProduct: Array<number> = [];

      // 모든 생리용품에 대한 화학물질 검출량 추출
      Object.entries(data).map((product) => {
        return Object.entries(product[1]).map((arr) =>
          arr[0] === chemical ? detectedPerProduct.push(Number(arr[1])) : null
        );
      });

      // 오름차순으로 정렬
      detectedPerProduct.sort((a, b) => a - b);

      // 해당 화학물질에 대한 평균값 계산
      const mean = detectedPerProduct
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
        .toFixed(2);

      // 해당 화학물질에 대한 중앙값 계산
      const median = (
        (detectedPerProduct[Math.floor(detectedPerProduct.length / 2)] +
          detectedPerProduct[Math.ceil(detectedPerProduct.length / 2)]) /
        2
      ).toFixed(2);

      // 해당 화학물질에 대한 표준편차 계산
      const SD = Math.sqrt(
        detectedPerProduct
          .map((x) => Math.pow(x - Number(mean), 2))
          .reduce((acc, curr, i, { length }) => {
            return i === length - 1 ? (acc + curr) / length : acc + curr;
          }, 0)
      ).toFixed(2);

      // 해당 화학물질에 대한 최솟값 계산
      const min = Math.min(...detectedPerProduct).toFixed(2);

      // 해당 화학물질에 대한 최댓값 계산
      const max = Math.max(...detectedPerProduct).toFixed(2);

      // 사용자가 선택한 제품에서 검출된 해당 화학물질의 검출량
      let target = "";

      if (chemicalInfo) {
        Object.entries(chemicalInfo).map((arr) =>
          arr[0] === chemical ? (target += Number(arr[1]).toFixed(2)) : null
        );
      }

      return {
        chemicalName: chemical,
        target: target,
        mean: mean,
        median: median,
        SD: SD,
        min: min,
        max: max,
      };
    });
    table.push(tableInfo.flat());
  }

  return (
    <GridContainer>
      <Row>
        <TH>검출 VOCs</TH>
        <TD>
          <Box onClick={clickToSearch}>검출량</Box>
        </TD>
        <TD>
          <Box onClick={clickToSearch}>평균</Box>
        </TD>
        <TD>
          <Box onClick={clickToSearch}>중앙값</Box>
        </TD>
        <TD>
          <Box onClick={clickToSearch}>표준편차</Box>
        </TD>
        <TD>
          <Box onClick={clickToSearch}>최솟값</Box>
        </TD>
        <TD>
          <Box onClick={clickToSearch}>최댓값</Box>
        </TD>
      </Row>
      {table
        ? table.map((row) =>
            row.map((el) => (
              <Row key={el.chemicalName}>
                <TH>
                  <Box onClick={clickToSearch}>{el.chemicalName}</Box>
                </TH>
                <TD>{el.target}</TD>
                <TD>{el.mean}</TD>
                <TD>{el.median}</TD>
                <TD>{el.SD}</TD>
                <TD>{el.min}</TD>
                <TD>{el.max}</TD>
              </Row>
            ))
          )
        : null}
    </GridContainer>
  );
};

export default Table;
