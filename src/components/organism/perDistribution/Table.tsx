import React, { MouseEvent, useState, useEffect } from "react";
import styled from "styled-components";

import * as T from '../../../types';
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
  const [table, setTable] = useState<Array<T.ResultPerDistribution>>([]);
  
  useEffect(() => {
    const tableInfo = detectedOnBoth.map((chemicalDetected) => {
      const domesticProductsIngredientContent: Array<number> = []
      const overseaProductsIngredientContent: Array<number> = []
      chemicalData.forEach((product) => {
        if (product.distribution === T.Distribution.DOMESTIC) {
          Object.entries(product).forEach((chemicalInfo) => {
            const chemicalName = chemicalInfo[0]
            const ingredientContent = Number(chemicalInfo[1])
            if (chemicalName === chemicalDetected && ingredientContent > 0) domesticProductsIngredientContent.push(ingredientContent)
          })
        } else if (product.distribution === T.Distribution.OVERSEA) {
          Object.entries(product).forEach((chemicalInfo) => {
            const chemicalName = chemicalInfo[0]
            const ingredientContent = Number(chemicalInfo[1])
            if (chemicalName === chemicalDetected && ingredientContent > 0) overseaProductsIngredientContent.push(ingredientContent)
          })
        }
      })
      // 해당 화학물질이 검출된 제품 수 계산
      const NumOfDomesticProducts = domesticProductsIngredientContent.length;
      const NumOfOverseaProducts = overseaProductsIngredientContent.length;

      // 해당 화학물질이 검출된 제품 수의 비율
      const PercentOfDomestic = ((Number(NumOfDomesticProducts) / 365) * 100).toFixed(2);
      const PercentOfOversea = ((Number(NumOfOverseaProducts) / 20) * 100).toFixed(2);

      // 해당 화학물질에 대한 평균값 계산
      const meanOfDomestic = Mean(domesticProductsIngredientContent)
      const meanOfOversea = Mean(overseaProductsIngredientContent)

      // 해당 화학물질에 대한 중앙값 계산
      const medianOfDomestic = Median(domesticProductsIngredientContent)
      const medianOfOversea = Median(overseaProductsIngredientContent)

      // 해당 화학물질에 대한 표준편차 계산
      const SDofDomestic = SD(domesticProductsIngredientContent, meanOfDomestic)
      const SDofOversea = SD(overseaProductsIngredientContent, meanOfOversea)

      // 해당 화학물질에 대한 최솟값 계산
      const minOfDomestic = Min(domesticProductsIngredientContent)
      const minOfOversea = Min(overseaProductsIngredientContent)

      // 해당 화학물질에 대한 최댓값 계산
      const maxOfDomestic = Max(domesticProductsIngredientContent)
      const maxOfOversea = Max(overseaProductsIngredientContent)

      return {
        chemicalName: chemicalDetected,
        number: {
          domestic: NumOfDomesticProducts,
          oversea: NumOfOverseaProducts
        },
        percentage: {
          domestic: PercentOfDomestic,
          oversea: PercentOfOversea,
        },
        mean: {
          domestic: meanOfDomestic,
          oversea: meanOfOversea
        },
        median: {
          domestic: medianOfDomestic,
          oversea: medianOfOversea
        },
        SD: {
          domestic: SDofDomestic,
          oversea: SDofOversea
        },
        min: {
          domestic: minOfDomestic,
          oversea: minOfOversea
        },
        max: {
          domestic: maxOfDomestic,
          oversea: maxOfOversea
        },
      };
    })
    setTable(tableInfo)
  }, [chemicalData, detectedOnBoth])
  
  return (
    <GridContainer>
      <Row>
        <TH>VOCs</TH>
        <TD>
          제품 수 <Percent>(비율)</Percent>
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
      {table.map((el) => (
        <Row key={el.chemicalName}>
          <CH>
            <Box onClick={clickToSearch}>{el.chemicalName}</Box>
          </CH>
          <CD>국내</CD>
          <CD>
            {el.number.domestic}{" "}
            <Percent>({el.percentage.domestic}%)</Percent>
          </CD>
          <CD>{el.mean.domestic}</CD>
          <CD>{el.median.domestic}</CD>
          <CD>{el.SD.domestic}</CD>
          <CD>{el.min.domestic}</CD>
          <CD>{el.max.domestic}</CD>
          <CD>해외</CD>
          <CD>
            {el.number.oversea}{" "}
            <Percent>({el.percentage.oversea}%)</Percent>
          </CD>
          <CD>{el.mean.oversea}</CD>
          <CD>{el.median.oversea}</CD>
          <CD>{el.SD.oversea}</CD>
          <CD>{el.min.oversea}</CD>
          <CD>{el.max.oversea}</CD>
        </Row>
      ))}
    </GridContainer>
  );
};

export default Table;
