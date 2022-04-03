import React, { MouseEvent } from "react";
import VOCsPerProduct from "../organism/perProduct";

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
    <VOCsPerProduct close={close} clickToSearch={clickToSearch} />
  );
};

export default VOCs;
