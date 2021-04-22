import React from "react";
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

type Props = {
  data: DataProps[];
  detectedInBoth: string[];
  clickToSearch: any;
};

const Table = ({ data, detectedInBoth, clickToSearch }: Props) => {
  let table = detectedInBoth.map((chemical) => {
    let disposable: number[] = [];
    let reusable: number[] = [];
    data.map((product) => {
      if (product.usage === "일회용") {
        let arr = Object.entries(product);
        arr.map((el) => {
          if (el[0] === chemical && el[1] !== "0") {
            disposable.push(Number(el[1]));
          }
          return el;
        });
      } else {
        let arr = Object.entries(product);
        arr.map((el) => {
          if (el[0] === chemical && el[1] !== "0") {
            reusable.push(Number(el[1]));
          }
          return el;
        });
      }
      return product;
    });
    // 오름차순으로 정렬
    disposable.sort((a, b) => a - b);
    reusable.sort((a, b) => a - b);

    // 해당 화학물질이 검출된 제품 수 계산
    let NofDisposable = disposable.length;
    let NofReusable = reusable.length;

    // 해당 화학물질이 검출된 제품 수의 비율
    let PercentOfDisposable = ((Number(NofDisposable) / 333) * 100).toFixed(2);
    let PercentOfReusable = ((Number(NofReusable) / 52) * 100).toFixed(2);

    // 해당 화학물질에 대한 평균값 계산
    let meanOfDisposable = disposable
      .reduce((acc, curr, i, { length }) => {
        return i === length - 1 ? (acc + curr) / length : acc + curr;
      }, 0)
      .toFixed(2);
    let meanOfReusable = reusable
      .reduce((acc, curr, i, { length }) => {
        return i === length - 1 ? (acc + curr) / length : acc + curr;
      }, 0)
      .toFixed(2);

    // 해당 화학물질에 대한 중앙값 계산
    let medianOfDisposable = (
      (disposable[Math.floor(disposable.length / 2)] +
        disposable[Math.ceil(disposable.length / 2)]) /
      2
    ).toFixed(2);
    let medianOfReusable =
      reusable.length !== 1
        ? (
            (reusable[Math.floor(reusable.length / 2)] +
              reusable[Math.ceil(reusable.length / 2)]) /
            2
          ).toFixed(2)
        : reusable[0];

    // 해당 화학물질에 대한 표준편차 계산
    let SDofDisposable = Math.sqrt(
      disposable
        .map((x) => Math.pow(x - Number(meanOfDisposable), 2))
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
    ).toFixed(2);
    let SDofReusable = Math.sqrt(
      reusable
        .map((x) => Math.pow(x - Number(meanOfReusable), 2))
        .reduce((acc, curr, i, { length }) => {
          return i === length - 1 ? (acc + curr) / length : acc + curr;
        }, 0)
    ).toFixed(2);

    // 해당 화학물질에 대한 최솟값 계산
    let minOfDisposable = Math.min(...disposable).toFixed(2);
    let minOfReusable = Math.min(...reusable).toFixed(2);

    // 해당 화학물질에 대한 최댓값 계산
    let maxOfDisposable = Math.max(...disposable).toFixed(2);
    let maxOfReusable = Math.max(...reusable).toFixed(2);

    return {
      chemicalName: chemical,
      number: { disposable: NofDisposable, reusable: NofReusable },
      percentage: {
        disposable: PercentOfDisposable,
        reusable: PercentOfReusable,
      },
      mean: { disposable: meanOfDisposable, reusable: meanOfReusable },
      median: { disposable: medianOfDisposable, reusable: medianOfReusable },
      SD: { disposable: SDofDisposable, reusable: SDofReusable },
      min: { disposable: minOfDisposable, reusable: minOfReusable },
      max: { disposable: maxOfDisposable, reusable: maxOfReusable },
    };
  });

  return (
    <GridContainer>
      <Row>
        <TH>VOCs</TH>
        <TD>
          <Box onClick={clickToSearch}>제품 수</Box>
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
          ))
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
  grid-template-columns: repeat(8, auto);
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
  text-align: center;
  width: 240px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.text};
  grid-column: 1 / span 2;
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

const CH = styled.div`
  font-size: 18px;
  padding: 10px;
  text-align: flex-start;
  width: 160px;
  box-sizing: border-box;
  border-right: 1px solid ${({ theme }) => theme.tableBorder};
  grid-row: 1 / span 2;
  line-height: 2;
`;

const CD = styled.div`
  font-size: 18px;
  padding: 10px;
  text-align: center;
  width: calc((960px - 240px) / 6);
  border-right: 1px solid ${({ theme }) => theme.text};
  box-sizing: border-box;

  &:nth-child(2) {
    width: 80px;
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
    width: 80px;
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
