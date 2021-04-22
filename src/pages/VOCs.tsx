import React from "react";
import Main from "../components/VOCs";

type Props = {
  close: boolean;
  clickToSearch: any;
};

const index = ({ close, clickToSearch }: Props) => {
  return (
    <>
      <Main close={close} clickToSearch={clickToSearch} />
    </>
  );
};

export default index;
