import React, { useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";

import * as T from '../../../types';
import { Max, Mean, Median, Min, SD } from "../../../utils";

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
  chemicalData: Array<T.ChemicalData>;
  chemicalInfo: T.StringObj | undefined;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

const Table = ({ chemicalData, chemicalInfo, clickToSearch }: Props) => {
  const [chemicalList, setChemicalList] = useState<Array<[string, string | number]>>([]);
  const [table, setTable] = useState<Array<T.ResultPerProduct>>([]);

  useEffect(() => {
    if (chemicalInfo) {
      setChemicalList(Object.entries(chemicalInfo));
    }
  }, [chemicalInfo]);

  useEffect(() => {
    const tableInfo = chemicalList.map((chemical) => {
      const chemicalName = chemical[0]
      const target = chemical[1].toString()
      
      const ingredientContent: Array<number> = []
      
      chemicalData.forEach((product) => {
        Object.entries(product).forEach((chemicalInfo) => {
          if (chemicalInfo[0] === chemicalName) ingredientContent.push(Number(chemicalInfo[1]))
        })
      })
      
      // 해당 화학물질에 대한 평균값 계산
      const mean = Mean(ingredientContent)
      
      // 해당 화학물질에 대한 중앙값 계산
      const median = Median(ingredientContent)
      
      // 해당 화학물질에 대한 표준편차 계산
      const StandardDeviation = SD(ingredientContent, median)

      // 해당 화학물질에 대한 최솟값 계산
      const min = Min(ingredientContent)

      // 해당 화학물질에 대한 최댓값 계산
      const max = Max(ingredientContent)
      
      return {
        chemicalName,
        target,
        mean,
        median,
        SD: StandardDeviation,
        min,
        max,
      }
    })
    setTable(tableInfo)
  }, [chemicalList, chemicalData])
  

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
      {table.map((el: T.ResultPerProduct) => (
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
    ))}
    </GridContainer>
  );
};

export default Table;
