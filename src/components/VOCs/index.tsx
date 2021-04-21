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
        <Column>
          <TitleWrapper>
            <Title>
              생리용품 <Box>VOCs</Box> 검출결과
            </Title>
          </TitleWrapper>
          <SelectBox data={VOCsData} />
        </Column>
      </Inner>
    </Section>
  );
};

export default VOCs;

const Section = styled.section`
  width: 100%;
`;

const Inner = styled.div`
  width: 960px;
  margin: 0 auto;
  padding: 112px 0;
`;

const Column = styled.div`
  padding: 40px 0;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: 700;
`;

const Box = styled.span`
  padding: 0 30px;
  border: 3px solid ${({ theme }: any) => theme.text};
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
