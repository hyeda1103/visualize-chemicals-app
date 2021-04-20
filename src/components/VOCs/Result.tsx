import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
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
  searchResult: DataProps;
};

// Indexable Types 설정
type StringObj = {
  [index: string]: string | number;
};

const Result = ({ searchResult }: Props) => {
  const [distribution, setDistribution] = useState<string | undefined>("");
  const [usage, setUsage] = useState<string | undefined>("");
  const [company, setCompany] = useState<string | undefined>("");
  const [product, setProduct] = useState<string | undefined>("");
  const [chemicalInfo, setChemicalInfo] = useState<StringObj | undefined>(
    undefined
  );

  useEffect(() => {
    if (searchResult) {
      let FoundVOCsInfo = Object.entries(searchResult).filter(
        (el) =>
          el[0] !== "distribution" &&
          el[0] !== "usage" &&
          el[0] !== "company" &&
          el[0] !== "productName" &&
          el[1] !== "미검출"
      );

      let resultObj: StringObj = {};
      FoundVOCsInfo.map((el) => (resultObj[el[0]] = el[1]));
      setChemicalInfo(resultObj);

      setCompany(searchResult.company);
      setProduct(searchResult.productName);
      setUsage(searchResult.usage);
      setDistribution(searchResult.distribution);
    }
  }, [searchResult]);
  console.log(chemicalInfo);

  return <ResultWrapper>{searchResult ? company : null}</ResultWrapper>;
};

export default Result;

const ResultWrapper = styled.section`
  width: 960px;
  font-size: 20px;
`;
