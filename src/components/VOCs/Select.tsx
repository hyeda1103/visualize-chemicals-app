import React, { useState } from "react";
import styled from "styled-components/macro";
import ReactSelect from "react-select";
import Result from "./Result";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "45px",
    height: "45px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    height: "45px",
    padding: "0 6px",
  }),

  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "45px",
  }),
};

type DataProps = {
  index: number;
  distribution: string;
  usage: string;
  company: string;
  productName: string;
  Ethylbenzene: string;
  Undecane: string;
  Styrene: string;
  Nonanal: string;
  Chloroform: string;
  Decanal: string;
  Trichloroethylene: string;
  Hexachlorobutadiene: string;
  Dichloromethane: string;
  "1,2-Dichloroethane": string;
  Benzene: string;
  Bromodichloromethane: string;
  Toluene: string;
  "1,4-Dichlorobenzene": string;
  "Xylene(p-, m-, o-)": string;
  Naphthalene: string;
  Hexane: string;
  "(-)-alpha-Pinene": string;
  Tetrachloroehtylene: string;
  "(-)-beta-Pinene": string;
  "2-Propanol": "0.492";
  "2-Ethyltoluene": string;
  "2-Butanone": string;
  "3-Ethyltoluene": string;
  Ethylacetate: string;
  "4-Ethyltoluene": string;
  Isooctane: string;
  "1,2,3-Trimethylbenzene": string;
  "4-Methyl-2-Pentanone": string;
  "1,2,4-Trimethylbenzene": string;
  Octane: string;
  "1,3,5-Trimethylbenzene": string;
  "1,1,2-Trichloroethane": string;
  "1,2-Dichloropropane": string;
  "1,3-Dichloropropane": string;
  Carbontetrachloride: string;
  Butylacetate: string;
  "2,4-Dimethylpentane": string;
  Chlorobenzene: string;
  "1,2,4,5-Tetramethylbenzene": string;
  Nonane: string;
  Dodecane: string;
  Cumene: string;
  Tridecane: string;
  Propylbenzene: string;
  Tetradecane: string;
  Decane: string;
  "n-Pentadecane": string;
  sec_Butylbenzene: string;
  "n-Hexadecane": string;
  "R-(+)-Limonene": string;
  Ethanol: string;
  "p-Cymene": string;
  Acetone: string;
  "1,2,3-Trichlorobenzene": string;
  "1-Propanol": string;
  "n-Butylbenzene": string;
  Heptane: string;
  "1,2-Dichlorobenzene": string;
  "1-Butanol": string;
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

  return (
    <>
      <SelectWrapper>
        <ReactSelect
          options={DistributionOption}
          onChange={handleDistribution}
          noOptionsMessage={() => null}
          placeholder="유통 선택"
          menuPortalTarget={document.querySelector("body")}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              ...theme.colors,
              primary25: "#FF8A00",
              primary: "#FF8A00",
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
              primary25: "#FF8A00",
              primary: "#FF8A00",
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
              primary25: "#FF8A00",
              primary: "#FF8A00",
            },
          })}
        />
      </SelectWrapper>
      <Result searchResult={selectedProductInfo[0]} />
    </>
  );
};

export default SelectBox;

const SelectWrapper = styled.div`
  display: grid;
  width: 720px;
  column-gap: 10px;
  grid-template-columns: 200px 200px 200px;
`;
