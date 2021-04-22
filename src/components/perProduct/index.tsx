import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import SelectBox from "./Select";

type Props = {
  close: boolean;
  clickToSearch: any;
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
            <Title>
              생리용품 <Box onClick={clickToSearch}>VOCs</Box> 검출결과
            </Title>
          </TitleWrapper>
          <SelectBox clickToSearch={clickToSearch} data={VOCsData} />
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
  width: ${({ close }) => (close ? "960px" : "70%")};
  margin: ${({ close }) => (close ? "0 auto" : "0")};
  position: relative;
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
