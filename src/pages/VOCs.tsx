import React from "react";
import VOCsPerProduct from "../components/perProduct";
import VOCsPerUsage from "../components/perUsage";
import VOCsPerDistribution from "../components/perDistribution";

type Props = {
  close: boolean;
  clickToSearch: any;
};

const index = ({ close, clickToSearch }: Props) => {
  return (
    <>
      <VOCsPerProduct close={close} clickToSearch={clickToSearch} />
      <VOCsPerUsage close={close} clickToSearch={clickToSearch} />
      <VOCsPerDistribution close={close} clickToSearch={clickToSearch} />
    </>
  );
};

export default index;
