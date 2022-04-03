import React, { MouseEvent } from "react";
import VOCsPerDistribution from "../organism/perDistribution";

interface Props {
  close: boolean;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

function VOCs ({ close, clickToSearch }: Props) {
  return (
    <VOCsPerDistribution close={close} clickToSearch={clickToSearch} />
  );
};

export default VOCs;
