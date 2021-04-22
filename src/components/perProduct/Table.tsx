import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

// Indexable Types 설정
type StringObj = {
  [index: string]: string | number;
};

type Props = {
  data: DataProps[];
  chemicalInfo: StringObj | undefined;
  clickToSearch: any;
};

const Table = ({ data, chemicalInfo, clickToSearch }: Props) => {
  const [chemicalList, setChemicalList] = useState<string[]>([]);
  let table: StringObj[][] = [];
  let row: StringObj[] = [];

  useEffect(() => {
    if (chemicalInfo) {
      setChemicalList(Object.keys(chemicalInfo));
    }
  }, [chemicalInfo]);

  // 검출된 화학물질에 대한 통계수치 계산
  if (chemicalList) {
    let tableInfo = chemicalList.map((chemical) => {
      let detectedPerProduct: number[] = [];

      // 모든 생리용품에 대한 화학물질 검출량 추출
      Object.entries(data).map((product) => {
        return Object.entries(product[1]).map((arr) =>
          arr[0] === chemical ? detectedPerProduct.push(Number(arr[1])) : null
        );
      });

      // 오름차순으로 정렬
      detectedPerProduct.sort((a, b) => a - b);

      // 해당 화학물질에 대한 평균값 계산
      let mean = detectedPerProduct
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
        .toFixed(3);

      // 해당 화학물질에 대한 중앙값 계산
      let median = (
        (detectedPerProduct[Math.floor(detectedPerProduct.length / 2)] +
          detectedPerProduct[Math.ceil(detectedPerProduct.length / 2)]) /
        2
      ).toFixed(3);

      // 해당 화학물질에 대한 표준편차 계산
      let SD = Math.sqrt(
        detectedPerProduct
          .map((x) => Math.pow(x - Number(mean), 2))
          .reduce((acc, curr, i, { length }) => {
            return i === length - 1 ? (acc + curr) / length : acc + curr;
          }, 0)
      ).toFixed(3);

      // 해당 화학물질에 대한 최솟값 계산
      let min = Math.min(...detectedPerProduct).toFixed(3);

      // 해당 화학물질에 대한 최댓값 계산
      let max = Math.max(...detectedPerProduct).toFixed(3);

      let resultObj: StringObj = {};

      if (chemicalInfo) {
        Object.entries(chemicalInfo).map((arr) =>
          arr[0] === chemical ? (resultObj["target"] = arr[1]) : null
        );
      }

      resultObj["chemicalName"] = chemical;
      resultObj["mean"] = mean;
      resultObj["median"] = median;
      resultObj["SD"] = SD;
      resultObj["min"] = min;
      resultObj["max"] = max;

      let newRow = row.concat(resultObj);

      return newRow;
    });
    table.push(tableInfo.flat());
  }

  return (
    <GridContainer>
      <Row>
        <TH>VOCs</TH>
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

const GridContainer = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Row = styled.div`
  width: 960px;
  display: grid;
  grid-template-columns: repeat(7, auto);
  border-bottom: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;
  margin: 0 auto;

  &:last-child {
    border-bottom: 0;
  }
`;

const TH = styled.div`
  font-size: 18px;
  padding: 10px;
  text-align: flex-start;
  width: 240px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.text};
`;

const TD = styled.div`
  font-size: 18px;
  padding: 10px;
  text-align: center;
  width: calc((960px - 240px) / 6);
  border-right: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:last-child {
    border-right: 0;
  }
`;

const Box = styled.span`
  padding: 1px 10px;
  border: 1px solid ${({ theme }: any) => theme.text};
  background: ${({ theme }: any) => theme.body};
  color: ${({ theme }: any) => theme.text};
  cursor: pointer;
  border-radius: 10px;
  transition: 0.6s ease;

  &:hover {
    color: ${({ theme }: any) => theme.body};
    background: ${({ theme }: any) => theme.text};
  }
`;
