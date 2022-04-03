import React, { useState, useEffect, MouseEvent } from "react";

import getVOCsReportData from "../../../utils";
import OnePartLayout from "../../template/OnePart";
import Result from "./Result";

interface Props {
  close: boolean;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: { e: MouseEvent<HTMLElement, globalThis.MouseEvent>; };
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
    <h1>국내유통 vs 해외직구</h1>
  )
  const content = (
    VOCsData && <Result clickToSearch={clickToSearch} data={VOCsData} />
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
