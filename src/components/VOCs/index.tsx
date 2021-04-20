import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import SelectBox from "./Select";

const VOCs = () => {
  const [VOCsData, setVOCsData] = useState([]);
  const getData = () => {
    fetch("/data/2020_VOCs_data_385.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setVOCsData(json);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Section>
      <Inner>
        <TitleWrapper>
          <h1>내가 사용하는 생리용품에서 검출되었다, 무엇?</h1>
        </TitleWrapper>
        <SelectBox data={VOCsData} />
      </Inner>
    </Section>
  );
};

export default VOCs;

const Section = styled.section`
  width: 100%;
`;

const Inner = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding: 64px 0;
`;

const TitleWrapper = styled.div`
  h1 {
    font-size: 70px;
  }
`;
