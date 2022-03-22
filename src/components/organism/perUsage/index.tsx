import React, { useState, useEffect, MouseEvent } from "react";
import OnePartLayout from "../../template/OnePart";
import Result from "./Result";

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
    <>일회용 vs 다회용</>
  )
  
  const content = (
    <>
      {VOCsData && <Result clickToSearch={clickToSearch} data={VOCsData} />}
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
