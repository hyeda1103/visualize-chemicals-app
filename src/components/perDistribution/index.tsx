import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Result from "./Result";

type Props = {
  close: boolean;
  clickToSearch: string;
};

const VOCs = ({ close, clickToSearch }: Props) => {
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
      <Inner close={close}>
        <Column>
          <TitleWrapper>
            <Title>국내유통 vs 해외직구</Title>
          </TitleWrapper>
          <Result clickToSearch={clickToSearch} data={VOCsData} />
        </Column>
      </Inner>
    </Section>
  );
};

export default VOCs;

const Section = styled.section`
  width: 100%;
`;

type StyleProps = {
  close: boolean;
};

const Inner = styled.div<StyleProps>`
  transform: ${({ close }) => (close ? 'translateX(0)' : 'translateX(-15%)')};
  transition: 0.6s;
  position: relative;
  padding: 112px 0;
`

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
