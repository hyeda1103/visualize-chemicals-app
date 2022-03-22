import React from "react";
import styled from "styled-components";
import * as T from '../../types'


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
  transition: 0.6s ease;

  &:hover {
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.text};
  }
`;


interface Props {
  data: Array<T.ChemicalData>;
  detectedInBoth: string[];
  clickToSearch: () => void;
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
    let medianOfDisposable =
      disposable.length !== 1
        ? (
            (disposable[Math.floor(disposable.length / 2)] +
              disposable[Math.ceil(disposable.length / 2)]) /
            2
          ).toFixed(2)
        : disposable[0];
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
