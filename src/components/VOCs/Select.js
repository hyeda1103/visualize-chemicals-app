import React, { useState } from "react";
import styled from "styled-components/macro";
import Select from "react-select";
import Result from "./Result";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "45px",
    height: "45px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "45px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "45px",
  }),
};

const SelectBox = ({ data }) => {
  const [selectedDistribution, setSelectedDistribution] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  let DistributionOptions = [
    ...new Set(data.map((el) => el.distribution)),
  ].sort();
  let DistributionOption = DistributionOptions.map((distribution, index) => ({
    value: index,
    label: distribution,
  }));

  let CompanyOptions = data.filter(
    (option) => option.distribution === selectedDistribution
  );
  let CompanyOption = [
    ...new Set(CompanyOptions.map((el) => el.company)),
  ].sort();
  CompanyOption = CompanyOption.map((company, index) => ({
    value: index,
    label: company,
  }));

  let ProductOptions = data.filter(
    (el) =>
      el.distribution === selectedDistribution && el.company === selectedCompany
  );
  let ProductOption = [
    ...new Set(ProductOptions.map((el) => el.productName)),
  ].sort();
  ProductOption = ProductOption.map((product, index) => ({
    value: index,
    label: product,
  }));

  let selectedProductInfo = data.filter(
    (option) => option.productName === selectedProduct
  );

  // 유통 입력
  const handleDistribution = (e) => {
    setSelectedDistribution(e.label);
  };
  // 유통 및 제조사 입력
  const handleCompany = (e) => {
    setSelectedCompany(e.label);
  };
  // 제품 입력
  const handleProduct = (e) => {
    setSelectedProduct(e.label);
  };

  return (
    <>
      <SelectWrapper>
        <Select
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

        <Select
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

        <Select
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
