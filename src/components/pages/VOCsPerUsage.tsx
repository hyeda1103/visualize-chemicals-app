import React, { MouseEvent } from "react";
import VOCsPerUsage from "../organism/perUsage";

interface Props {
  close: boolean;
  clickToSearch: (e: MouseEvent<HTMLElement>) => {
    type: "dictionay/SEARCH";
    payload: {
      e: MouseEvent<HTMLElement, globalThis.MouseEvent>;
    };
  };
};

function VOCs({ close, clickToSearch }: Props) {
  return (
    <VOCsPerUsage close={close} clickToSearch={clickToSearch} />
  );
};

export default VOCs;
