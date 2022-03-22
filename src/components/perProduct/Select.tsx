import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import ReactSelect, { ActionMeta, GroupTypeBase, OptionTypeBase, StylesConfig } from "react-select";
import Result from "./Result";
import * as T from "../../types";

const customStyles: StylesConfig<OptionTypeBase, false> = {
  control: (provided) => ({
    ...provided,
    background: "#fff",
    fontSize: "20px",
    borderColor: "#363537",
    color: "#363537",
    minHeight: "50px",
    height: "50px",
  }),
  // 드롭다운 메뉴
  option: (provided) => ({
    ...provided,
    color: "#363537",
    fontSize: "16px",
    padding: "10px 16px",
    overflow: "hidden",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#363537",
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: "50px",
    padding: "0 12px",
  }),

  input: (provided) => ({
    ...provided,
    margin: "0px",
    color: "#363537",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "50px",
  }),
};


const SelectWrapper = styled.div`
  display: grid;
  column-gap: 16px;
  grid-template-columns: repeat(3, 250px);
  margin: 80px 0;
  justify-content: center;
`;

interface Props {
  clickToSearch: any;
  ChemicalData: Array<T.ChemicalData>;
};

const SelectBox = ({ clickToSearch, ChemicalData }: Props) => {
  const [Options, setOptions] = useState<{
    DistributionOpts: (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[] | undefined,
    CompanyOpts: (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[] | undefined,
    ProductOpts: (OptionTypeBase | GroupTypeBase<OptionTypeBase>)[] | undefined,
  }>({
    DistributionOpts: undefined,
    CompanyOpts: undefined,
    ProductOpts: undefined,
  })
  const { DistributionOpts, CompanyOpts, ProductOpts } = Options;
  const [result, setResult] = useState<T.ChemicalData>()
  
  useEffect(() => {
    const DistributionOpts = ChemicalData.map((singleChemicalInfo, index) => ({
      value: `${singleChemicalInfo['distribution']}`,
      label: singleChemicalInfo['distribution'],
    }))
    const CompanyOpts = ChemicalData.map((singleChemicalInfo, index) => ({
      value: `${singleChemicalInfo['company']}`,
      label: singleChemicalInfo['company'],
    }))
    const ProductOpts = ChemicalData.map((singleChemicalInfo, index) => ({
      value: `${singleChemicalInfo['productName']}`,
      label: singleChemicalInfo['productName'],
    }))
    setOptions({
      DistributionOpts: DistributionOpts.filter((v, i, a) => a.findIndex(v2 => (v2.label === v.label))===i),
      CompanyOpts: CompanyOpts.filter((v, i, a) => a.findIndex(v2 => (v2.label === v.label))===i),
      ProductOpts: ProductOpts.filter((v, i, a) => a.findIndex(v2 => (v2.label === v.label))===i),
    })
  }, [ChemicalData])
  
  const handleDistribution: (((value: OptionTypeBase | null, actionMeta: ActionMeta<OptionTypeBase>) => void) & ((value: OptionTypeBase | null, action: ActionMeta<OptionTypeBase>) => void)) | undefined
    = (option) => {
      if (!option) return; 
      const CompanyOptsByDistribution = ChemicalData.filter((singleChemicalInfo, index) => singleChemicalInfo['distribution'] === option.label)
      const CompanyOpts = CompanyOptsByDistribution.map((singleChemicalInfo, index) => ({
        value: `${singleChemicalInfo['company']}`,
        label: singleChemicalInfo['company'],
      }))
      setOptions({
        ...Options,
        CompanyOpts: CompanyOpts.filter((v, i, a) => a.findIndex(v2 => (v2.label === v.label))===i),
      })
    }
  
  // 유통 및 제조사 입력
  const handleCompany: (((value: OptionTypeBase | null, actionMeta: ActionMeta<OptionTypeBase>) => void) & ((value: OptionTypeBase | null, action: ActionMeta<OptionTypeBase>) => void)) | undefined
    = (option) => {
      if (!option) return; 
      const ProductOptsByCompany = ChemicalData.filter((singleChemicalInfo, index) => singleChemicalInfo['company'] === option.label)
      const ProductOpts = ProductOptsByCompany.map((singleChemicalInfo, index) => ({
        value: `${singleChemicalInfo['productName']}`,
        label: singleChemicalInfo['productName'],
      }))
      setOptions({
        ...Options,
        ProductOpts,
      })
    }
  // 제품 입력
  const handleProduct: (((value: OptionTypeBase | null, actionMeta: ActionMeta<OptionTypeBase>) => void) & ((value: OptionTypeBase | null, action: ActionMeta<OptionTypeBase>) => void)) | undefined
    = (option) => {
      if (!option) return; 
      const ProductOpts = ChemicalData.filter((singleChemicalInfo, index) => singleChemicalInfo['productName'] === option.label)
      setResult(ProductOpts[0])
    }

  return (
    <>
      <SelectWrapper>
        <ReactSelect
          options={DistributionOpts}
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
            },
          })}
        />
        <ReactSelect
          options={CompanyOpts}
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
            },
          })}
        />
        <ReactSelect
          options={ProductOpts}
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
            },
          })}
        />
      </SelectWrapper>
      {result && <Result
        clickToSearch={clickToSearch}
        data={ChemicalData}
        searchResult={result}
      />}
    </>
  );
};

export default SelectBox;
