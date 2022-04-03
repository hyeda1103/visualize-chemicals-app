import React, { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import * as T from '../../../types'


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
        } else {
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
      const meanOfDisposable = disposableIngredientContent
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
        .toFixed(2);
      const meanOfReusable = reusableIngredientContent
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
        .toFixed(2);

      // 해당 화학물질에 대한 중앙값 계산
      const medianOfDisposable =
        NumOfDisposableProducts !== 1
          ? (
              (disposableIngredientContent[Math.floor(NumOfDisposableProducts / 2)] +
                disposableIngredientContent[Math.ceil(NumOfDisposableProducts / 2)]) /
              2
            ).toFixed(2)
          : disposableIngredientContent[0].toFixed(2);
      const medianOfReusable =
        NumOfReusableProducts !== 1
          ? (
              (reusableIngredientContent[Math.floor(NumOfReusableProducts / 2)] +
                reusableIngredientContent[Math.ceil(NumOfReusableProducts / 2)]) /
              2
            ).toFixed(2)
          : reusableIngredientContent[0].toFixed(2);

      // 해당 화학물질에 대한 표준편차 계산
      const SDofDisposable = Math.sqrt(
        disposableIngredientContent
          .map((x) => Math.pow(x - Number(meanOfDisposable), 2))
          .reduce((acc, curr, i, { length }) => {
            return i === length - 1 ? (acc + curr) / length : acc + curr;
          }, 0)
      ).toFixed(2);
      const SDofReusable = Math.sqrt(
        reusableIngredientContent
          .map((x) => Math.pow(x - Number(meanOfReusable), 2))
          .reduce((acc, curr, i, { length }) => {
            return i === length - 1 ? (acc + curr) / length : acc + curr;
          }, 0)
      ).toFixed(2);

      // 해당 화학물질에 대한 최솟값 계산
      const minOfDisposable = Math.min(...disposableIngredientContent).toFixed(2);
      const minOfReusable = Math.min(...reusableIngredientContent).toFixed(2);

      // 해당 화학물질에 대한 최댓값 계산
      const maxOfDisposable = Math.max(...disposableIngredientContent).toFixed(2);
      const maxOfReusable = Math.max(...reusableIngredientContent).toFixed(2);

      return {
        chemicalName: chemicalDetected,
        number: {
          disposableIngredientContent: NumOfDisposableProducts,
          reusableIngredientContent: NumOfReusableProducts
        },
        percentage: {
          disposableIngredientContent: PercentOfDisposable,
          reusableIngredientContent: PercentOfReusable,
        },
        mean: {
          disposableIngredientContent: meanOfDisposable,
          reusableIngredientContent: meanOfReusable
        },
        median: {
          disposableIngredientContent: medianOfDisposable,
          reusableIngredientContent: medianOfReusable
        },
        SD: {
          disposableIngredientContent: SDofDisposable,
          reusableIngredientContent: SDofReusable
        },
        min: {
          disposableIngredientContent: minOfDisposable,
          reusableIngredientContent: minOfReusable
        },
        max: {
          disposableIngredientContent: maxOfDisposable,
          reusableIngredientContent: maxOfReusable
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
            {el.number.disposableIngredientContent}{" "}
            <Percent>({el.percentage.disposableIngredientContent}%)</Percent>
          </CD>
          <CD>{el.mean.disposableIngredientContent}</CD>
          <CD>{el.median.disposableIngredientContent}</CD>
          <CD>{el.SD.disposableIngredientContent}</CD>
          <CD>{el.min.disposableIngredientContent}</CD>
          <CD>{el.max.disposableIngredientContent}</CD>
          <CD>다회용</CD>
          <CD>
            {el.number.reusableIngredientContent}{" "}
            <Percent>({el.percentage.reusableIngredientContent}%)</Percent>
          </CD>
          <CD>{el.mean.reusableIngredientContent}</CD>
          <CD>{el.median.reusableIngredientContent}</CD>
          <CD>{el.SD.reusableIngredientContent}</CD>
          <CD>{el.min.reusableIngredientContent}</CD>
          <CD>{el.max.reusableIngredientContent}</CD>
        </Row>
      ))}
    </GridContainer>
  );
};

export default Table;
