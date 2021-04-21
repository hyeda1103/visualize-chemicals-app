import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Table from "./Table";

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
  searchResult: DataProps;
};

// Indexable Types 설정
type StringObj = {
  [index: string]: string | number;
};

const Result = ({ data, searchResult }: Props) => {
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

      let resultObj: StringObj = {};
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
          지난 12월 식약처에서 총 385개의 생리용품에 대한 60종의 VOCs 모니터링
          결과를 공개했다. 그에 따르면 {distribution}한 {company}의 {product}
          에서 {Object.entries(chemicalInfo).length}종의 VOCs가 검출되었다.
        </Paragraph>
      ) : null}
      {chemicalInfo ? <Table data={data} chemicalInfo={chemicalInfo} /> : null}
    </ResultWrapper>
  );
};

export default Result;

const ResultWrapper = styled.section`
  width: 840px;
  margin: 0 auto;
`;

const Paragraph = styled.div`
  text-align: justify;
  line-height: 2;
  margin: 40px auto;
  font-size: 20px;
`;
