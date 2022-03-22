import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "./Table";
import * as T from '../../types';


interface Props {
  data: Array<T.ChemicalData>;
  searchResult: T.ChemicalData;
  clickToSearch: () => void;
};

// Indexable Types 설정
interface StringObj {
  [index: string]: string | number;
};

const Result = ({ data, searchResult, clickToSearch }: Props) => {
  const [distribution, setDistribution] = useState<string | undefined>("");
  const [company, setCompany] = useState<string | undefined>("");
  const [product, setProduct] = useState<string | undefined>("");
  const [chemicalInfo, setChemicalInfo] = useState<StringObj | undefined>(
    undefined
  );

  useEffect(() => {
    if (searchResult) {
      let FoundVOCsInfo = Object.entries(searchResult).filter(
        (el) =>
          el[0] !== "index" &&
          el[0] !== "distribution" &&
          el[0] !== "usage" &&
          el[0] !== "company" &&
          el[0] !== "productName" &&
          el[1] !== "0"
      );

      const resultObj: StringObj = {};
      FoundVOCsInfo.map((el) => (resultObj[el[0]] = el[1]));
      setChemicalInfo(resultObj);

      setCompany(searchResult.company);
      setProduct(searchResult.productName);
      setDistribution(searchResult.distribution);
    }
  }, [searchResult]);

  return (
    <ResultWrapper>
      {searchResult && chemicalInfo ? (
        <Paragraph>
          2020년 12월 식약처에서 총 385개의 생리용품에 대한 60종의 VOCs 모니터링
          결과를 공개했다. 그에 따르면 {distribution}한 {company}의 {product}
          에서 {Object.entries(chemicalInfo).length}종의 VOCs가 검출되었다.
        </Paragraph>
      ) : null}
      {chemicalInfo ? (
        <Table
          data={data}
          chemicalInfo={chemicalInfo}
          clickToSearch={clickToSearch}
        />
      ) : null}
    </ResultWrapper>
  );
};

export default Result;

const ResultWrapper = styled.section`
  width: 960px;
  margin: 0 auto;
`;

const Paragraph = styled.div`
  text-align: justify;
  line-height: 2;
  width: 840px;
  margin: 40px auto 80px;
  font-size: 20px;
`;
