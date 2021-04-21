import React, { useState } from "react";
import styled from "styled-components/macro";
import ReactSelect from "react-select";
import Result from "./Result";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#fff",
    fontSize: "20px",
    borderColor: `${({ theme }: any) => theme.text}`,
    color: "#363537",
    minHeight: "50px",
    height: "50px",
  }),
  // 드롭다운 메뉴
  option: (provided: any) => ({
    ...provided,
    color: "#363537",
    fontSize: "16px",
    padding: "10px 16px",
    overflow: "hidden",
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: "#363537",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: "50px",
    padding: "0 12px",
  }),

  input: (provided: any) => ({
    ...provided,
    margin: "0px",
    color: "#363537",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "50px",
  }),
};

type DataProps = {
  index: number;
  distribution: string;
  usage: string;
  company: string;
  productName: string;
  에틸벤젠: string;
  운데칸: string;
  스티렌: string;
  노나날: string;
  클로로포름: string;
  데카날: string;
  트리클로로에틸렌: string;
  헥사클로로부타디엔: string;
  Dichloromethane: string;
  "1,2-디클로로에탄": string;
  벤젠: string;
  브로모디클로로메탄: string;
  톨루엔: "0.12";
  "1,4-디클로로벤젠": string;
  "(p-, m-, o-)자일렌": string;
  나프탈렌: string;
  헥산: string;
  "(1S)-(-)-알파-피넨": string;
  테트라클로로에틸렌: string;
  "(-)-베타-피넨": string;
  "2-프로판올": string;
  "2-에틸톨루엔": string;
  "2-부타논": string;
  "3-에틸톨루엔": string;
  에틸아세테이트: string;
  "4-에틸톨루엔": string;
  이소옥탄: string;
  "1,2,3-트리메틸벤젠": string;
  "4-메틸-2-펜타논": string;
  "1,2,4-트리메틸벤젠": string;
  옥탄: string;
  "1,3,5-트리메틸벤젠": string;
  "1,1,2-트리클로로에탄": string;
  "1,2-디클로로프로판": string;
  "1,3-디클로로프로판": string;
  사염화탄소: string;
  부틸아세테이트: string;
  "2,4-디메틸펜탄": string;
  클로로벤젠: string;
  "1,2,4,5-테트라메틸벤젠": string;
  노난: string;
  도데칸: string;
  쿠멘: string;
  트리데칸: string;
  프로필벤젠: string;
  테트라데칸: string;
  데칸: string;
  "n-펜타데칸": string;
  "sec-부틸벤젠": string;
  "n-헥사데칸": string;
  "(R)-(+)-리모넨": string;
  에탄올: string;
  "p-시멘": string;
  아세톤: string;
  "1,2,3-트리클로로벤젠": string;
  "1-프로판올": string;
  "n-부틸벤젠": string;
  헵탄: string;
  "1,2-디클로로벤젠": string;
  "1-부탄올": string;
};

type Props = {
  data: DataProps[];
};

const SelectBox = ({ data }: Props) => {
  const [selectedDistribution, setSelectedDistribution] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  let DistributionOptions = [
    ...new Set(data.map((el: DataProps) => el.distribution)),
  ].sort();

  let DistributionOption = DistributionOptions.map((distribution, index) => ({
    value: index,
    label: distribution,
  }));

  let CompanyOptions = data.filter(
    (option: DataProps) => option.distribution === selectedDistribution
  );

  let CompanyOption = [
    ...new Set(CompanyOptions.map((el: any) => el.company)),
  ].sort();

  CompanyOption = CompanyOption.map((company, index) => ({
    value: index,
    label: company,
  }));

  let ProductOptions = data.filter(
    (option: DataProps) =>
      option.distribution === selectedDistribution &&
      option.company === selectedCompany
  );

  let ProductOption = [
    ...new Set(ProductOptions.map((el: any) => el.productName)),
  ].sort();

  ProductOption = ProductOption.map((product, index) => ({
    value: index,
    label: product,
  }));

  let selectedProductInfo = data.filter(
    (option: any) => option.productName === selectedProduct
  );

  // 유통 입력
  const handleDistribution = (e: any) => {
    setSelectedDistribution(e.label);
  };
  // 유통 및 제조사 입력
  const handleCompany = (e: any) => {
    setSelectedCompany(e.label);
  };
  // 제품 입력
  const handleProduct = (e: any) => {
    setSelectedProduct(e.label);
  };

  const focusDistribution = (e: any) => {
    CompanyOption = [];
  };

  return (
    <>
      <SelectWrapper>
        <ReactSelect
          options={DistributionOption}
          onChange={handleDistribution}
          onFocus={focusDistribution}
          noOptionsMessage={() => null}
          placeholder="유통 선택"
          menuPortalTarget={document.querySelector("body")}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#999",
              primary: "#999",
            },
          })}
        />

        <ReactSelect
          options={CompanyOption}
          onChange={handleCompany}
          noOptionsMessage={() => `옵션이 없어요`}
          menuPortalTarget={document.querySelector("body")}
          placeholder="제조/수입사 선택"
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#999",
              primary: "#999",
            },
          })}
        />

        <ReactSelect
          options={ProductOption}
          onChange={handleProduct}
          menuPortalTarget={document.querySelector("body")}
          noOptionsMessage={() => `옵션이 없어요`}
          placeholder="제품 선택"
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#999",
              primary: "#999",
            },
          })}
        />
      </SelectWrapper>
      <Result data={data} searchResult={selectedProductInfo[0]} />
    </>
  );
};

export default SelectBox;

const SelectWrapper = styled.div`
  display: grid;
  column-gap: 16px;
  grid-template-columns: repeat(3, 250px);
  margin: 80px 0;
  justify-content: center;
`;
