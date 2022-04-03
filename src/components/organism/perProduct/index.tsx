import React, { useState, useEffect, MouseEvent } from "react";
import styled from "styled-components/macro";

import SelectBox from "./Select";
import OnePartLayout from "../../template/OnePart";
import getVOCsReportData from "../../../utils";

const Box = styled.span`
  padding: 0 30px;
  border: 3px solid ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  border-radius: 10px;
  transition: 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.text};
  }
`;

interface Props {
  close: boolean;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

const VOCs = ({ close, clickToSearch }: Props) => {
  const [VOCsData, setVOCsData] = useState([]);
  
  useEffect(() => {
    async function getResult() {
      try {
        const res = await getVOCsReportData()
        setVOCsData(res)
      } catch (err) {
        console.error(err)
      }
    };
    getResult();
  }, []);

  const title = (
    <h1>
      생리용품 <Box onClick={clickToSearch}>VOCs</Box> 검출결과
    </h1>
  )

  const content = (
    VOCsData && <SelectBox clickToSearch={clickToSearch} ChemicalData={VOCsData} />
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
