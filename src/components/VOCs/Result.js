import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

const Result = ({ searchResult }) => {
  const [result, setResult] = useState({});

  useEffect(() => {
    if (searchResult) {
      let FoundVOCsInfo = Object.entries(searchResult).filter(
        (el) => el[1] !== "미검출"
      );
      let resultObj = {};
      for (let i = 0; i < FoundVOCsInfo.length; i++) {
        let key = FoundVOCsInfo[i][0];
        let value = FoundVOCsInfo[i][1];
        resultObj[key] = value;
      }
      setResult(resultObj);
    }
  }, [searchResult]);
  return (
    <ResultWrapper>
      {result.company}
      {result.productName}
    </ResultWrapper>
  );
};

export default Result;

const ResultWrapper = styled.section`
  width: 960px;
  font-size: 20px;
`;
