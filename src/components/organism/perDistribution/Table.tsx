import React, { MouseEvent } from "react";
import styled from "styled-components";
import * as T from '../../../types';

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
  data: Array<T.ChemicalData>;
  detectedInBoth: Array<string>;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

const Table = ({ data, detectedInBoth, clickToSearch }: Props) => {
  let table = detectedInBoth.map((chemical) => {
    let domestic: Array<number> = [];
    let overseas: Array<number> = [];
    data.map((product) => {
      if (product.distribution === "국내유통") {
        let arr = Object.entries(product);
        arr.map((el) => {
          if (el[0] === chemical && el[1] !== "0") {
            domestic.push(Number(el[1]));
          }
          return el;
        });
      } else {
        let arr = Object.entries(product);
        arr.map((el) => {
          if (el[0] === chemical && el[1] !== "0") {
            overseas.push(Number(el[1]));
          }
          return el;
        });
      }
      return product;
    });

    // 오름차순으로 정렬
    domestic.sort((a, b) => a - b);
    overseas.sort((a, b) => a - b);

    // 해당 화학물질이 검출된 제품 수 계산
    let NofDomestic = domestic.length;
    let NofOverseas = overseas.length;

    // 해당 화학물질이 검출된 제품 수의 비율
    let PercentOfDomestic = ((Number(NofDomestic) / 365) * 100).toFixed(2);
    let PercentOfOverseas = ((Number(NofOverseas) / 20) * 100).toFixed(2);

    // 해당 화학물질에 대한 평균값 계산
    let meanOfDomestic = domestic
      .reduce((acc, curr, i, { length }) => {
        return i === length - 1 ? (acc + curr) / length : acc + curr;
      }, 0)
      .toFixed(2);
    let meanOfOverseas = overseas
      .reduce((acc, curr, i, { length }) => {
        return i === length - 1 ? (acc + curr) / length : acc + curr;
      }, 0)
      .toFixed(2);

    // 해당 화학물질에 대한 중앙값 계산
    let medianOfDomestic =
      domestic.length !== 1
        ? (
            (domestic[Math.floor(domestic.length / 2)] +
              domestic[Math.ceil(domestic.length / 2)]) /
            2
          ).toFixed(2)
        : domestic[0];
    let medianOfOverseas =
      overseas.length !== 1
        ? (
            (overseas[Math.floor(overseas.length / 2)] +
              overseas[Math.ceil(overseas.length / 2)]) /
            2
          ).toFixed(2)
        : overseas[0];

    // 해당 화학물질에 대한 표준편차 계산
    let SDofDomestic = Math.sqrt(
      domestic
        .map((x) => Math.pow(x - Number(meanOfDomestic), 2))
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
    ).toFixed(2);
    let SDofOverseas = Math.sqrt(
      overseas
        .map((x) => Math.pow(x - Number(meanOfOverseas), 2))
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
    ).toFixed(2);

    // 해당 화학물질에 대한 최솟값 계산
    let minOfDomestic = Math.min(...domestic).toFixed(2);
    let minOfOverseas = Math.min(...overseas).toFixed(2);

    // 해당 화학물질에 대한 최댓값 계산
    let maxOfDomestic = Math.max(...domestic).toFixed(2);
    let maxOfOverseas = Math.max(...overseas).toFixed(2);

    return {
      chemicalName: chemical,
      number: { domestic: NofDomestic, overseas: NofOverseas },
      percentage: {
        domestic: PercentOfDomestic,
        overseas: PercentOfOverseas,
      },
      mean: { domestic: meanOfDomestic, overseas: meanOfOverseas },
      median: { domestic: medianOfDomestic, overseas: medianOfOverseas },
      SD: { domestic: SDofDomestic, overseas: SDofOverseas },
      min: { domestic: minOfDomestic, overseas: minOfOverseas },
      max: { domestic: maxOfDomestic, overseas: maxOfOverseas },
    };
  });

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
      {table
        ? table.map((el) => (
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
                {el.number.overseas}{" "}
                <Percent>({el.percentage.overseas}%)</Percent>
              </CD>
              <CD>{el.mean.overseas}</CD>
              <CD>{el.median.overseas}</CD>
              <CD>{el.SD.overseas}</CD>
              <CD>{el.min.overseas}</CD>
              <CD>{el.max.overseas}</CD>
            </Row>
          ))
        : null}
    </GridContainer>
  );
};

export default Table;
