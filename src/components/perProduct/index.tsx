import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import SelectBox from "./Select";
import * as T from '../../types';
import OnePartLayout from "../template/OnePart";

const Box = styled.span`
  padding: 0 30px;
  border: 3px solid ${({ theme }) => theme.text};
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
  close: boolean;
  clickToSearch: () => void;
};

const VOCs = ({ close, clickToSearch }: Props) => {
  const [VOCsData, setVOCsData] = useState<Array<T.ChemicalData>>();
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

  const title = (
    <>
      생리용품 <Box onClick={clickToSearch}>VOCs</Box> 검출결과
    </>
  )

  const content = (
    <>
      {VOCsData && <SelectBox clickToSearch={clickToSearch} ChemicalData={VOCsData} />}
    </>
  )

  return (
    <OnePartLayout
      close={close}
      title={title}
      content={content}
    />
  );
};

export default VOCs;
