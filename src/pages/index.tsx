import React from "react";
import Main from "../components/Main";

type Props = {
  clickToSearch: any;
};

const index = ({ clickToSearch }: Props) => {
  return (
    <>
      <Main clickToSearch={clickToSearch} />
    </>
  );
};

export default index;
