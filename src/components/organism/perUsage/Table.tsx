import React, { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";

import * as T from '../../../types'
import { Max, Mean, Median, Min, SD } from "../../../utils";


const GridContainer = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 60px 0;
`;

const Row = styled.div`
  width: 840px;
  display: grid;
  grid-template-columns: repeat(8, auto);
  border-bottom: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  margin: 0 auto;

  &:last-child {
    border-bottom: 0;
  }
`;

const TH = styled.div`
  padding: 10px;
  text-align: center;
  width: 180px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.text};
  grid-column: 1 / span 2;
`;

const TD = styled.div`
  padding: 10px;
  text-align: center;
  width: calc((840px - 180px) / 6);
  border-right: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:last-child {
    border-right: 0;
  }
`;

const CH = styled.div`
  padding: 10px;
  text-align: flex-start;
  width: 110px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.tableBorder};
  grid-row: 1 / span 2;
  line-height: 2;
`;

const CD = styled.div`
  padding: 10px;
  text-align: center;
  width: calc((840px - 180px) / 6);
  border-right: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:nth-child(2) {
    width: 70px;
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(3) {
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(4) {
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(5) {
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(6) {
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(7) {
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(8) {
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.tableBorder};
  }

  &:nth-child(9) {
    width: 70px;
  }

  &:last-child {
    border-right: 0;
  }
`;

const Percent = styled.span`
  font-size: 12px;
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
  detectedOnBoth: Array<string>;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

function Table({ chemicalData, detectedOnBoth, clickToSearch }: Props) {
  const [table, setTable] = useState<Array<T.ResultPerUsage>>([]);

  useEffect(() => {
    const tableInfo = detectedOnBoth.map((chemicalDetected) => {
      const disposableIngredientContent: Array<number> = []
      const reusableIngredientContent: Array<number> = []
      chemicalData.forEach((product) => {
        if (product.usage === T.Usage.DISPOSABLE) {
          Object.entries(product).forEach((chemicalInfo) => {
            const chemicalName = chemicalInfo[0]
            const ingredientContent = Number(chemicalInfo[1])
            if (chemicalName === chemicalDetected && ingredientContent > 0) disposableIngredientContent.push(ingredientContent)
          })
        } else if (product.usage === T.Usage.REUSABLE) {
          Object.entries(product).forEach((chemicalInfo) => {
            const chemicalName = chemicalInfo[0]
            const ingredientContent = Number(chemicalInfo[1])
            if (chemicalName === chemicalDetected && ingredientContent > 0) reusableIngredientContent.push(ingredientContent)
          })
        }
      })
      // 해당 화학물질이 검출된 제품 수 계산
      const NumOfDisposableProducts = disposableIngredientContent.length;
      const NumOfReusableProducts = reusableIngredientContent.length;

      // 해당 화학물질이 검출된 제품 수의 비율
      const PercentOfDisposable = ((Number(NumOfDisposableProducts) / 333) * 100).toFixed(2);
      const PercentOfReusable = ((Number(NumOfReusableProducts) / 52) * 100).toFixed(2);

      // 해당 화학물질에 대한 평균값 계산
      const meanOfDisposable = Mean(disposableIngredientContent)
      const meanOfReusable = Mean(reusableIngredientContent)

      // 해당 화학물질에 대한 중앙값 계산
      const medianOfDisposable = Median(disposableIngredientContent)
      const medianOfReusable = Median(reusableIngredientContent)

      // 해당 화학물질에 대한 표준편차 계산
      const SDofDisposable = SD(disposableIngredientContent, meanOfDisposable)
      const SDofReusable = SD(reusableIngredientContent, meanOfReusable)

      // 해당 화학물질에 대한 최솟값 계산
      const minOfDisposable = Min(disposableIngredientContent)
      const minOfReusable = Min(reusableIngredientContent)

      // 해당 화학물질에 대한 최댓값 계산
      const maxOfDisposable = Max(disposableIngredientContent)
      const maxOfReusable = Max(reusableIngredientContent)

      return {
        chemicalName: chemicalDetected,
        number: {
          disposable: NumOfDisposableProducts,
          reusable: NumOfReusableProducts
        },
        percentage: {
          disposable: PercentOfDisposable,
          reusable: PercentOfReusable,
        },
        mean: {
          disposable: meanOfDisposable,
          reusable: meanOfReusable
        },
        median: {
          disposable: medianOfDisposable,
          reusable: medianOfReusable
        },
        SD: {
          disposable: SDofDisposable,
          reusable: SDofReusable
        },
        min: {
          disposable: minOfDisposable,
          reusable: minOfReusable
        },
        max: {
          disposable: maxOfDisposable,
          reusable: maxOfReusable
        },
      };
    })
    setTable(tableInfo)
  }, [chemicalData, detectedOnBoth])

  return (
    <GridContainer>
      <Row>
        <TH>VOCs</TH>
        <TD>제품 수</TD>
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
      {table.map((el) => (
        <Row key={el.chemicalName}>
          <CH>
            <Box onClick={clickToSearch}>{el.chemicalName}</Box>
          </CH>
          <CD>일회용</CD>
          <CD>
            {el.number.disposable}{" "}
            <Percent>({el.percentage.disposable}%)</Percent>
          </CD>
          <CD>{el.mean.disposable}</CD>
          <CD>{el.median.disposable}</CD>
          <CD>{el.SD.disposable}</CD>
          <CD>{el.min.disposable}</CD>
          <CD>{el.max.disposable}</CD>
          <CD>다회용</CD>
          <CD>
            {el.number.reusable}{" "}
            <Percent>({el.percentage.reusable}%)</Percent>
          </CD>
          <CD>{el.mean.reusable}</CD>
          <CD>{el.median.reusable}</CD>
          <CD>{el.SD.reusable}</CD>
          <CD>{el.min.reusable}</CD>
          <CD>{el.max.reusable}</CD>
        </Row>
      ))}
    </GridContainer>
  );
};

export default Table;
